import React from 'react'
import NavBar from '../components/NavBar'
import BreadCrumbs from '../components/BreadCrumbs'
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography';
import CourseCard from '../components/CourseCard';
import Button from '@material-ui/core/Button';
const topics = [
    {
        id: 0,
        title: 'Newtone First law of mossion',
        subTitle: 'Compulasary part II',
        publicationStatus: 'published'
    },
    {
        id: 1,
        title: 'Newtone First second of mossion',
        subTitle: 'part I',
        publicationStatus: 'draft'
    },
    {
        id: 2,
        title: 'Third Law OF mossion',
        subTitle: 'Compulasary part II',
        publicationStatus: 'draft'
    },
    {
        id: 3,
        title: 'Simple Pendulmn',
        subTitle: 'Compulasary part II',
        publicationStatus: 'published'
    },
    {
        id: 4,
        title: 'Hormonic Mossion',
        subTitle: 'Compulasary part II',
        publicationStatus: 'archived'
    },
    {
        id: 5,
        title: 'Gravity',
        subTitle: 'Compulasary part II',
        publicationStatus: 'archived'
    },

]
export default function CourseDetail(props) {
    return (
        <div>
            <NavBar haveButton={true} buttonTxt="Course Topic" buttonPath="/topic" />
            <Box
                component={Grid}
                item
                xl={12}
                display={{ xs: "none", sm: "block" }}
            >
                <BreadCrumbs />
            </Box>
            {
                topics.length === 0 ? (<div style={{
                    textAlign: 'center'
                }}  >
                    <Typography variant="h6" >
                        There is no Course.
                                    </Typography>
                    <Button variant="contained" color="primary">
                        Create Course
                                        </Button>
                </div>) : (
                        <Grid container spacing={6} direction="row" justify='center'  >

                            {
                                topics.map((topic) => {
                                    return (<Grid item key={topic.id} >
                                        <CourseCard id={topic.id} title={topic.title} subTitle={topic.subTitle} publicationStatus={topic.publicationStatus} pageRoute={`/${topic.title}`} />
                                    </Grid>);
                                })
                            }
                        </Grid>
                    )
            }
        </div>
    )
}
