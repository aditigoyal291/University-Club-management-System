const ClubNamePage = () => {
    // Get the ClubName parameter from the URL
    const { ClubName } = useParams();

    // Add your logic for the /clubname route here

    return (
      <div>
        <h1>Club Name: {ClubName}</h1>
        {/* Add your JSX code for the /clubname route here */}
      </div>
    );
  };

  export default ClubNamePage;