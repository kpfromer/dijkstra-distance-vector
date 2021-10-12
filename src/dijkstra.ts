import Graph from 'node-dijkstra';
import { table as tablePretty } from 'table';

export type Table = string;

export type GraphRaw = [node: string, neighbors: Record<string, number>];
export type GraphMap = Map<string, Map<string, number>>;

export function toGraphMap(raw: GraphRaw[]): GraphMap {
  const graph = new Map();

  raw.forEach(([node, neighbors]) => {
    const neighborsMap = Object.entries(neighbors).reduce((map, [neighbor, weight]) => {
      map.set(neighbor, weight);
      return map;
    }, new Map());

    graph.set(node, neighborsMap);
  });

  return graph;
}

function toGraph(map: GraphMap): Graph {
  return new Graph(map as any);
}

function nodeNames(graph: GraphMap): string[] {
  return Array.from(graph.keys());
}

function copyToBfs(graph: GraphMap): GraphMap {
  return Array.from(graph.entries()).reduce((g, [src, neighbors]) => {
    const n = Array.from(neighbors).reduce((map, [neighbor, weight]) => {
      map.set(neighbor, 1);
      return map;
    }, new Map());

    g.set(src, n);
    return g;
  }, new Map());
}

function bfs(graph: GraphMap, src: string): Map<string, number> {
  const g = toGraph(copyToBfs(graph));
  const nodes = nodeNames(graph);
  const nodeDistances = new Map();

  for (const dest of nodes) {
    const { path, cost } = g.path(src, dest, { cost: true });

    if (path) {
      nodeDistances.set(dest, cost);
    } else {
      nodeDistances.set(dest, 0);
    }
  }

  return nodeDistances;
}

export function toTable(graph: GraphMap, distance = Infinity): Table[] {
  const tables: Table[] = [];

  const nodes = nodeNames(graph);

  for (const src of nodes) {
    const bfsDistances = bfs(graph, src);
    const table: string[][] = [['Dest', 'Cost', 'Hop']];

    const nodesUnderDistance = new Set(
      Array.from(bfsDistances.entries())
        .filter(([node, dis]) => dis <= distance)
        .map(([node]) => node),
    );

    for (const dest of nodes) {
      if (nodesUnderDistance.has(dest)) {
        if (src !== dest) {
          const g = toGraph(graph);

          const { path, cost } = g.path(src, dest, { cost: true });
          if (path) {
            const nextHop = path.length > 1 ? path[1] : path[0];
            table.push([dest, cost, nextHop]);
          } else {
            table.push([dest, '-', '-']);
          }
        } else {
          table.push([src, '0', src]);
        }
      } else {
        table.push([src, '-', '-']);
      }
    }

    tables.push(
      tablePretty(table, {
        header: {
          alignment: 'center',
          content: `Table for src "${src}"`,
        },
      }),
    );
  }

  return tables;
}
