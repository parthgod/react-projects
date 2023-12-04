import { TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SearchBar = () => {

    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchTerm) {
            navigate(`/search/${searchTerm}`)
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', marginRight: '1rem', gap: '1rem' }}>
            <TextField
                placeholder="Search"
                variant="outlined"
                sx={{ background: 'white', color: 'black', width: '25rem', borderRadius: '5px' }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />
            <Button variant='outlined' sx={{
                height: '3.5rem',
                color: '#FF5733',
                border: '1px solid #FF5733',
                mr: '1rem',
                '&:hover': {
                    background: '#FF5733',
                    color: 'black',
                    border: '1px solid #FF5733'
                }
            }}
                onClick={handleSubmit}>Search</Button>
        </form>
    )
}

export default SearchBar