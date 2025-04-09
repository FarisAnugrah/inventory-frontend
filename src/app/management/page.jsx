import Table from '@components/Table';
import { headers } from 'next/headers';

export default function management{
    const columns = [
        {headers: "No", accessor: "No"},
        {headers: "Nama", accessor: "Nama"},
    ]
  return (
    <View>
      <Text>page</Text>
    </View>
  )
}