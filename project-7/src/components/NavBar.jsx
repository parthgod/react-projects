import { Stack } from '@mui/material';
import TvIcon from '@mui/icons-material/Tv';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MovieIcon from '@mui/icons-material/Movie';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useGlobalContext } from '../context';

const NavBar = () => {

  const { selectedCategory, setSelectedCategory } = useGlobalContext()

  const navigations = [
    {
      name: 'Movies',
      icon: <MovieIcon />
    },
    {
      name: 'Series',
      icon: <TvIcon />
    },
    {
      name: 'Favs',
      icon: <BookmarkIcon />
    }
  ]

  return (
    <Stack gap={2} bgcolor='#0f0f0f' direction='row' justifyContent='space-between' height='5rem' alignItems='center' position='fixed' width='100vw' zIndex='10'>
      <Stack direction='row'>
        {navigations.map((item) => (
          <Link to={item.name === 'Movies' ? '/' : `/${item.name.toLowerCase()}`} style={{ textDecoration: 'none' }} key={item.name}>
            <button className={`category-btn ${selectedCategory === item.name && `selected-btn`}`} onClick={() => { setSelectedCategory(item.name) }} key={item.name}>
              {item.icon} {item.name}
            </button>
          </Link>
        ))}
      </Stack>
      <SearchBar />
    </Stack>
  )
}

export default NavBar;