'use client';
import { useRouter } from 'next/navigation';

export default function AddButton({ to }) {
  const router = useRouter();

  const handleAdd = () => {
    router.push(to);
  };

  return (
    <button onClick={handleAdd} className="btn btn-primary">
      Tambah
    </button>
  );
}
