import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination({ count, page, onChange }) {
  return (
    <Stack spacing={2}>
      <Pagination count={count} page={page} onChange={onChange} />
    </Stack>
  );
}
