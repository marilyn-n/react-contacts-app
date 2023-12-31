import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import ImageIcon from '@mui/icons-material/Image';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AppCtx } from "../../context/appContext";
import CakeIcon from '@mui/icons-material/Cake';
import moment from "moment";
import SeeAllDialog from "../../components/SeeAllDialog";
import EmptyStateUI from "../../components/EmptyUIState";

const TheDashboard = () => {
    const { contacts, setOpen, handleSeeAllOpen, groups } = useContext(AppCtx);
    const starredContacts = contacts.filter(item => item.isStared);
    const map = <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d240863.9978504921!2d-99.45510693850875!3d19.39079237487473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce0026db097507%3A0x54061076265ee841!2sMexico%20City%2C%20CDMX!5e0!3m2!1sen!2smx!4v1687906913347!5m2!1sen!2smx" style={{ border: 0, width: '100%', height: 300 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    const [recentAdded, setRecentAdded] = useState([]);
    const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
    const [itemsData, setItemsData] = useState({
        items: [],
        label: '',
    });

    useEffect(() => {
        const compareDates = (a, b) => new Date(b.createdDate) - new Date(a.createdDate);
        const sortedEls = contacts.sort(compareDates);
        setRecentAdded(sortedEls);
        setUpcomingBirthdays(contacts.filter(c => new Date(c.dateOfBirth) > new Date()));
    }, []);

    const displayData = (arrayName) => {
        handleSeeAllOpen()
        switch (arrayName) {
            case 'rencentlyAdded':
                setItemsData({ items: [...recentAdded], label: 'Recently Added' });
                break;
            case 'upcomingBirthdays':
                setItemsData({ items: [...upcomingBirthdays], label: 'Upcoming Birthdays' });
                break;
            case 'starredContacts':
                setItemsData({ items: [...starredContacts], label: 'Starred Contacts' });
                break;
            case 'groups':
                setItemsData({ items: [...groups], label: 'Groups' });
                break;
            default:
                break;
        }
    }

    return (
        <Grid container item direction='row' justifyContent='center' alignSelf='center' spacing={2}>
            <Grid item xs={4}>
                <Card variant='outlined' sx={{ minHeight: 350 }}>
                    <CardContent>
                        <Typography>Recently Added</Typography>
                        <List>
                            {recentAdded.length ? recentAdded.slice(0, 3).map((contact) => {
                                return (
                                    <ListItem alignItems="flex-start" key={contact.id}>
                                        <ListItemAvatar>
                                            <Avatar alt={`${contact.firstName} ${contact.lastName}`} src="/static/images/avatar/1.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`${contact.firstName} ${contact.lastName}`}
                                            secondary={
                                                <>
                                                    <Typography
                                                        sx={{ display: 'inline', marginRight: '.25rem' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        Mobile
                                                    </Typography>
                                                    {contact.mobile}
                                                </>
                                            }
                                        />
                                        <Typography sx={{ fontSize: '.85rem' }}>{moment(contact.createdDate).fromNow()}</Typography>
                                    </ListItem>
                                )
                            }) : <EmptyStateUI label='No recent activity' />}
                        </List>
                        {recentAdded.length > 3 ?
                            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button onClick={() => displayData('rencentlyAdded')} size="small">See All</Button>
                            </CardActions> : null}
                    </CardContent>
                </Card>
                <Card variant='outlined' sx={{ marginTop: '1rem', minHeight: 350 }}>
                    <CardContent>
                        <Typography>Birthdays</Typography>
                        <List>
                            {upcomingBirthdays.length ? upcomingBirthdays.map((contact) => {
                                return (
                                    <ListItem alignItems="flex-start" key={contact.id}>
                                        <ListItemAvatar>
                                            <CakeIcon sx={{ fontSize: '2.25rem', color: '#ef63e0' }} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`${contact.firstName} ${contact.lastName}`}
                                            secondary={
                                                <>
                                                    <Typography
                                                        sx={{ display: 'inline', marginRight: '.25rem' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        Birthday
                                                    </Typography>
                                                    {moment(contact.dateOfBirth).format('LL')}
                                                </>
                                            }
                                        />
                                        <Typography sx={{ fontSize: '.85rem' }}>  {moment(contact.dateOfBirth).fromNow()}</Typography>
                                    </ListItem>
                                )
                            }) : <EmptyStateUI label='No upcoming events' />}
                        </List>
                    </CardContent>
                </Card>
                <Card variant='outlined' sx={{ marginTop: '1rem', minHeight: 300 }}>
                    <CardContent>
                        <Typography sx={{ marginBottom: '1rem' }}>My Community</Typography>
                        {map}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={2}>
                <Card variant='outlined' sx={{ minHeight: 350 }}>
                    <CardContent>
                        <Typography>Starred Contacts</Typography>
                        <List>
                            {starredContacts.length > 0 ? starredContacts.slice(0, 3).map((contact) => {
                                return (
                                    <ListItem key={contact.id}>
                                        <ListItemAvatar>
                                            <Avatar alt={`${contact.firstName} ${contact.lastName}`} src="/static/images/avatar/1.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText primary={`${contact.firstName} ${contact.lastName}`} secondary={contact.address} />
                                    </ListItem>
                                )
                            }) : <EmptyStateUI label='No starred contacts' />}
                        </List>
                        {starredContacts.length > 3 ?
                            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button onClick={() => displayData('starredContacts')} size="small">See All</Button>
                            </CardActions> : null}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={2}>
                <Card variant="outlined" sx={{ minHeight: 350 }}>
                    <CardContent>
                        <Typography>Groups</Typography>
                        <List>
                            {groups ? groups.slice(0, 3).map((g) => {
                                return (
                                    <ListItem key={g.id}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ImageIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={g.groupName} secondary="Jan 9, 2014" />

                                        <AvatarGroup total={g.members.length}>
                                            {g.members.map(member => {
                                                return <Avatar alt={`${member.firstName}`} src="/static/images/avatar/1.jpg" sx={{ width: 32, height: 32 }} />
                                            })}
                                        </AvatarGroup>
                                    </ListItem>
                                )
                            }) : <EmptyStateUI label='Create a group' />}
                        </List>
                        {groups.length > 3 ?
                            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button onClick={() => displayData('groups')} size="small">See All</Button>
                            </CardActions> : null}
                    </CardContent>
                </Card>
            </Grid>
            <SeeAllDialog itemsData={itemsData} />
        </Grid>
    )
}

export default TheDashboard;