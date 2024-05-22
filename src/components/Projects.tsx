import { useState } from "react";
import { useProjects } from "../services/queries";

export default function Projects() {
  const [page, setPage] = useState(1);
  const { isPending, isError, data, isPlaceholderData } = useProjects(page);

  return (
    <div>
      <h1>Projects</h1>
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <ul>
          {data.map((project) => (
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      )}
      <button onClick={() => setPage(Math.max(1, page - 1))}>Previous</button>
      <button onClick={() => setPage(page + 1)} disabled={isPlaceholderData}>
        Next
      </button>{" "}
    </div>
  );
}
