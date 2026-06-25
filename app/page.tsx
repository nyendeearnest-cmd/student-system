"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [students, setStudents] = useState<any[]>([]);

  const loadStudents = async () => {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: studentName,
        email: email,
      }),
    });

    setStudentName("");
    setEmail("");

    loadStudents();
  };

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Student Registration System
      </h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Name"
          className="border p-2"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2"
        />

        <button className="bg-black text-white px-4">
          Add
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2">Students</h2>

      {students.map((s) => (
        <div key={s.id} className="border p-2 mb-2">
          <p><b>Name:</b> {s.name}</p>
          <p><b>Email:</b> {s.email}</p>
        </div>
      ))}
    </main>
  );
}