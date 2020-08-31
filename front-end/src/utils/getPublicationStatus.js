const getPublicationStatus = (publication_status) => {
    switch (publication_status) {
        case 1:
            return 'Published';
        case 2:
            return 'Archived';
        default:
            return 'Draft'
    }
}
export default getPublicationStatus;