import { MenuItem, Select } from "@mui/material"

const GenreSelect = ({ item, setItem, data }) => {

  return (
    <Select
      value={item}
      onChange={(event) => setItem(event.target.value)}
      sx={{
        background: '#FF5733',
        width: '10rem',
        mr: '1.5rem',
        height: '2.5rem'
      }}      
      variant='outlined'
    >
      {data?.map((dropitem, ind) => (
        <MenuItem value={dropitem?.genre || dropitem} key={ind}>{dropitem?.genre || dropitem}</MenuItem>
      ))}
    </Select>
  )
}

export default GenreSelect