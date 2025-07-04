import fs from 'fs';
const graph = JSON.parse(fs.readFileSync('src/conceptGraph.json', 'utf-8'));

export const getPrerequisites = (target: string): string[] => {
  if (!graph[target]) {
    console.error(`Concept "${target}" not found in graph.`);
    return [];
  }

  const visited = new Set<string>();
  const result = new Set<string>();

  function dfs(node: string) {
    if (!graph[node] || visited.has(node)) return;
    
    visited.add(node);
    
    // Retrieve direct prerequisites
    const prereqs = graph[node].prereqs || [];
    for (let p of prereqs) {
      if (!visited.has(p)) {
        result.add(p);
        dfs(p);
      }
    }
  }

  dfs(target);
  //console.log(`Printing from prereq code-------Prerequisites for "${target}":`, Array.from(result));

  return Array.from(result);
};
