import React from "react";
import type { Project } from "../types/project";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/70 bg-white/75 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/10">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />
        {project.featured && (
          <span className="absolute top-4 right-4 bg-slate-950 text-white px-3 py-1 rounded-full text-sm font-bold">
            Destacado
          </span>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-black tracking-[-0.03em] text-blue-950 mb-2">
          {project.title}
        </h3>
        <p className="text-slate-600 mb-4 line-clamp-2 leading-7">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              data-tag={tag.toLowerCase()}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 bg-slate-950 text-white rounded-2xl hover:bg-slate-800 transition-colors font-semibold"
            >
              Ver Proyecto
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 border border-blue-200 text-blue-700 rounded-2xl hover:bg-blue-50 transition-colors font-semibold"
            >
              Ver Código
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
