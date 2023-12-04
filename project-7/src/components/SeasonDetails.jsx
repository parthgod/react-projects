import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography } from "@mui/material"
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

import { useGetEpisodesQuery } from "../redux/services/moviesApi";

const SeasonDetails = ({ seasons, id, season, setSeason }) => {

    const [expanded, setExpanded] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const currentPosition = window.pageYOffset;
        setScrollPosition(currentPosition);
    };

    const scrollToPosition = () => {
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        scrollToPosition();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [expanded]);

    const handleChange = (panel) => (event, newExpanded) => {
        event.preventDefault();
        setExpanded(newExpanded ? panel : false);
    };

    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: '#FF5733' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        background: '#222222',
        borderTop: '1px solid grey',
        color: 'white',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderBottom: '1px solid grey',
        color: 'white',
        background: '#222222',
    }));

    const { data: episodes } = useGetEpisodesQuery({ id, season });    

    return (
        <Stack px={5}>
            <Stack direction='row' gap='1rem' sx={{ overflowX: 'auto' }} borderBottom='1px solid grey' py={2}>
                {Array.from({ length: seasons?.results }, (_, index) => index + 1)?.map((item, ind) => (
                    <Box fontSize='1.5rem' fontFamily='sans-serif' onClick={() => setSeason(item)}
                        sx={{
                            background: season === item ? '#FF5733' : '', cursor: 'pointer', transition: 'all 0.15s ease-in', color: season === item ? 'black' : 'white',
                            '&:hover': season !== item && {
                                background: '#8b1b02'
                            },
                            whiteSpace: 'nowrap'
                        }} borderRadius={1} px={3} py={1} key={ind}>
                        Season {item}
                    </Box>
                ))}
            </Stack>
            <Stack>
                {episodes?.results?.map((episode, ind) => (
                    <Accordion expanded={expanded === ind + 1} onChange={handleChange(ind + 1)}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>{ind + 1}. {episode?.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{episode?.description}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Stack>
        </Stack>
    )
}

export default SeasonDetails
