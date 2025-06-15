import CustomForm from '@/components/CustomForm';

export default function AddUserPage() {
  const fields = [
    { label: 'Name', name: 'name', type: 'text', placeholder: 'name' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'email' },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'password' },
    {
      label: 'Role', name: 'role', type: 'select', options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Staff', value: 'staff' },
      ]
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log('Submit:', data);
    // Kirim ke API atau logic lain
  };

  return (
    <CustomForm title="Tambah User" fields={fields} onSubmit={handleSubmit} />
  );
}
