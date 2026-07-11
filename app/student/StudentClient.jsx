'use client';

import { useState } from 'react';
import Button from "@/component/Button";

export default function StudentClient({ students: initialStudents }) {
	const [students, setStudents] = useState(initialStudents);
	const [editingId, setEditingId] = useState(null);
	const [editForm, setEditForm] = useState({ name: '', age: '', major: '' });
	const [newForm, setNewForm] = useState({ name: '', age: '', major: '' });
	const [error, setError] = useState('');
	const [savingId, setSavingId] = useState(null);
	const [deletingId, setDeletingId] = useState(null);
	const [creating, setCreating] = useState(false);

    //--- Function to handle CRUD ---
	async function handleAdd(e) {
		e.preventDefault();
		if (!newForm.name.trim()) return;
		setError('');
		setCreating(true);

		try {
			const response = await fetch('/api/student', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: newForm.name,
					age: newForm.age ? Number(newForm.age) : null,
					major: newForm.major,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to create student');
			}

			const student = await response.json();
			setStudents((currentStudents) => [...currentStudents, student]);
			setNewForm({ name: '', age: '', major: '' });
		} catch (err) {
			setError(err.message || 'Failed to create student');
		} finally {
			setCreating(false);
		}
	}

	async function handleDelete(id) {
		setError('');
		setDeletingId(id);

		try {
			const response = await fetch(`/api/student/${id}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				throw new Error('Failed to delete student');
			}

			setStudents((currentStudents) => currentStudents.filter((s) => s.id !== id));
			if (editingId === id) setEditingId(null);
		} catch (err) {
			setError(err.message || 'Failed to delete student');
		} finally {
			setDeletingId(null);
		}
	}

	function startEdit(student) {
		setEditingId(student.id);
		setEditForm({
			name: student.name ?? '',
			age: student.age ?? '',
			major: student.major ?? '',
		});
	}

	function cancelEdit() {
		setEditingId(null);
		setEditForm({ name: '', age: '', major: '' });
	}

	async function handleSave(id) {
		setError('');
		setSavingId(id);

		try {
			const response = await fetch(`/api/student/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: editForm.name,
					age: editForm.age ? Number(editForm.age) : null,
					major: editForm.major,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to update student');
			}

			const updatedStudent = await response.json();
			setStudents((currentStudents) =>
				currentStudents.map((student) =>
					student.id === id ? updatedStudent : student
				)
			);
			cancelEdit();
		} catch (err) {
			setError(err.message || 'Failed to update student');
		} finally {
			setSavingId(null);
		}
	}
    //-----------

	const inputClass =
		'w-full rounded border border-slate-700 bg-slate-800 px-2 py-1 text-sm text-slate-100 focus:border-slate-500 focus:outline-none';

	return (
		<div className="min-h-screen bg-slate-950 p-6 text-slate-100">
			<h1 className="mb-6 text-3xl font-bold tracking-tight text-white">Students</h1>

            {/* Error message display */}
			{error ? (
				<div className="mb-4 rounded border border-rose-800 bg-rose-950 px-4 py-3 text-sm text-rose-200">
					{error}
				</div>
			) : null}

            {/* Insert form */}
			<form
				onSubmit={handleAdd}
				className="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-slate-800 bg-slate-900 p-4"
			>
				<div className="flex flex-col gap-1">
					<label className="text-xs text-slate-400">Name</label>
					<input
						className={inputClass}
						value={newForm.name}
						onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
						placeholder="Name"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-xs text-slate-400">Age</label>
					<input
						className={inputClass}
						type="number"
						value={newForm.age}
						onChange={(e) => setNewForm({ ...newForm, age: e.target.value })}
						placeholder="Age"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-xs text-slate-400">Major</label>
					<input
						className={inputClass}
						value={newForm.major}
						onChange={(e) => setNewForm({ ...newForm, major: e.target.value })}
						placeholder="Major"
					/>
				</div>
				<Button
					type="submit"
                    color="blue"
					disabled={creating}
					className="rounded bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-800"
				>
					{creating ? 'Adding...' : 'Add Student'}
				</Button>
			</form>

            {/* Table to display students */}
			<div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-xl shadow-black/20">
				<table className="w-full border-collapse text-left">
					<thead className="bg-slate-800/80 text-slate-200">
						<tr>
							<th className="px-4 py-3 font-medium">ID</th>
							<th className="px-4 py-3 font-medium">Name</th>
							<th className="px-4 py-3 font-medium">Age</th>
							<th className="px-4 py-3 font-medium">Major</th>
							<th className="px-4 py-3 font-medium">Actions</th>
						</tr>
					</thead>
					<tbody>
						{students.length > 0 ? (
							students.map((student) => {
								const isEditing = editingId === student.id;
								return (
									<tr
										key={student.id}
										className="border-t border-slate-800 hover:bg-slate-800/50"
									>
										<td className="px-4 py-3 text-slate-300">{student.id}</td>
										<td className="px-4 py-3 text-slate-100">
											{isEditing ? (
												<input
													className={inputClass}
													value={editForm.name}
													onChange={(e) =>
														setEditForm({ ...editForm, name: e.target.value })
													}
												/>
											) : (
												(student.name ?? '-')
											)}
										</td>
										<td className="px-4 py-3 text-slate-300">
											{isEditing ? (
												<input
													className={inputClass}
													type="number"
													value={editForm.age}
													onChange={(e) =>
														setEditForm({ ...editForm, age: e.target.value })
													}
												/>
											) : (
												(student.age ?? '-')
											)}
										</td>
										<td className="px-4 py-3 text-slate-300">
											{isEditing ? (
												<input
													className={inputClass}
													value={editForm.major}
													onChange={(e) =>
														setEditForm({ ...editForm, major: e.target.value })
													}
												/>
											) : (
												(student.major ?? '-')
											)}
										</td>

                                        {/* Buttons */}
										<td className="px-4 py-3">
											{isEditing ? (
												<div className="flex gap-2">
													<Button
														type="button"
                                                        color="green"
														disabled={savingId === student.id}
														onClick={() => handleSave(student.id)}
														className="rounded bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-800"
													>
														{savingId === student.id ? 'Saving...' : 'Save'}
													</Button>
													<Button
														type="button"
														onClick={cancelEdit}
														className="rounded bg-slate-700 px-3 py-1 text-xs font-medium text-white hover:bg-slate-600"
													>
														Cancel
													</Button>
												</div>
											) : (
												<div className="flex gap-2">
													<Button
														type="button"
                                                        color="blue"
														onClick={() => startEdit(student)}
														className="rounded bg-sky-600 px-3 py-1 text-xs font-medium text-white hover:bg-sky-500"
													>
														Edit
													</Button>
													<Button
														type="button"
                                                        color="red"
														disabled={deletingId === student.id}
														onClick={() => handleDelete(student.id)}
													className="rounded bg-rose-600 px-3 py-1 text-xs font-medium text-white hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-rose-800"
													>
													{deletingId === student.id ? 'Deleting...' : 'Delete'}
													</Button>
												</div>
											)}
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td className="px-4 py-6 text-center text-slate-400" colSpan={5}>
									No students found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}