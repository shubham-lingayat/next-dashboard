const UserProfilePage = ({params}: { params: { id: string } }) => {
    // const { id } = await params;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl"> Profile Page
                <span className="p-2 rounded bg-red-500 ml-2">{params.id}</span>
            </p>
        </div>
    )
}

export default UserProfilePage;
