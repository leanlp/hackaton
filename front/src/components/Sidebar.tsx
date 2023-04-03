import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Drawer } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from '@mui/icons-material/Person';

function HomeIcon(props: SvgIconProps) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Sidebar(){

    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return(
        <>
            <Box sx={{ display: 'flex' }} >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    sx={{
                    width: 1300,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <List>
                            <ListItem key={'Home'} disablePadding>
                                <Link to='/'>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <HomeIcon color="success" fontSize="large" />
                                    </ListItemIcon>
                                    <ListItemText primary={'Home'} />
                                </ListItemButton>
                                </Link>
                            </ListItem>
                        <ListItem key={'Mis Contratos'} disablePadding>
                                <Link to='/register'>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ReceiptLongIcon color="success" fontSize="large"/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Mis Contratos'} />
                                </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem key={'Perfil'} disablePadding>
                            <Link to='/profile'>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PersonIcon color="success" fontSize="large"/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Perfil'} />
                                </ListItemButton>
                                </Link>
                            </ListItem>
                    </List>
                </Drawer>
            </Box>
        </>
    )
}