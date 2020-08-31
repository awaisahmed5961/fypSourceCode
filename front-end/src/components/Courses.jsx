import React from 'react'

export default function Courses() {
    return (
        <div>
            {
                courses !== null && courses.length === 0 && !loading ? (<div style={{
                    textAlign: 'center'
                }} className={classes.coursesContainer} >
                    <Typography variant="h6" className={classes.noCouresError}>
                        There is no Course.
                                    </Typography>

                    <Button variant="contained" color="primary">
                        Create Course
                                        </Button>
                </div>) : (
                        <Grid container spacing={6} direction="row" justify='center' className={classes.coursesContainer} >
                            {
                                courses.map((course) => {
                                    return (
                                        <Grid item key={course._id}>
                                            <CourseCard
                                                id={course._id}
                                                title={course.title}
                                                subTitle={course.subTitle}
                                                description={course.description}
                                                publicationStatus={course.publicationStatus}
                                                pageRoute={`/${course.title.split(' ').join('-')}`}
                                                onDelete={handleCourseDelete}
                                            />
                                        </Grid>);
                                })
                            }
                        </Grid>
                    )
            }
        </div>
    )
}
