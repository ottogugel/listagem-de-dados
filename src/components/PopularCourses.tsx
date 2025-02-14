// components/PopularCourses.tsx
import { Link } from "react-router-dom";

export function PopularCourses() {
  const popularCourses = [
    {
      id: 1,
      title: "Curso de React Avançado",
      description: "Aprenda React com projetos reais e práticos.",
      image: "/images/react-course.jpg",
      link: "/course/react",
    },
    {
      id: 2,
      title: "Curso de Node.js",
      description: "Domine o backend com Node.js e Express.",
      image: "/images/node-course.jpg",
      link: "/course/node",
    },
    {
      id: 3,
      title: "Curso de TypeScript",
      description: "TypeScript do básico ao avançado.",
      image: "/images/typescript-course.jpg",
      link: "/course/typescript",
    },
  ];

  return (
    <div className="bg-zinc-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Most popular courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularCourses.map((course) => (
          <Link
            key={course.id}
            to={course.link}
            className="bg-zinc-800 rounded-lg overflow-hidden hover:bg-zinc-700 transition-colors"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm text-zinc-400 mt-2">{course.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
