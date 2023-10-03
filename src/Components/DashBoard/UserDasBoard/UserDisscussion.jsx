import PageTitle from "../../Common/PageTitle";
import "./userProfile.css";
function UserDisscussion() {
  return (
    <div className="container">
      <PageTitle title="আমার ডিসকাশন" />
      <h3 className="text-center mt-4 fw-semibold">
        আপনি কোনো ডিসকাশনে যুক্ত হননি!
      </h3>
    </div>
  );
}

export default UserDisscussion;
