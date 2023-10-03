import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Home route...
const Home = React.lazy(() => import("./Components/Home/Home"));

// authentication routes start here......
import Login from "./Components/Authentication/Login";
import Registration from "./Components/Authentication/Registration";

// dashboard routes starts here......
import InstructorDashBoard from "./Components/DashBoard/InstructorDashBoard/InstructorDashBoard";
import InstructorProfile from "./Components/DashBoard/InstructorDashBoard/InstructorProfile";
import StudentLeaderBoard from "./Components/DashBoard/InstructorDashBoard/StudentLeaderBoard";
import NewDashBoard from "./Components/DashBoard/NewDashBoard";
import Profile from "./Components/DashBoard/Profile";
import UserApplication from "./Components/DashBoard/UserDasBoard/UserApplication";
import UserCertificate from "./Components/DashBoard/UserDasBoard/UserCertificate";
import UserCourses from "./Components/DashBoard/UserDasBoard/UserCourses";
import UserEducation from "./Components/DashBoard/UserDasBoard/UserEducation";
import UserExperience from "./Components/DashBoard/UserDasBoard/UserExperience";
import CoursePerfomance from "./Components/DashBoard/UserDasBoard/UserPerformance/CoursePerfomance";
import JobPerfomance from "./Components/DashBoard/UserDasBoard/UserPerformance/JobPerfomance";
import QuizPerformance from "./Components/DashBoard/UserDasBoard/UserPerformance/QuizPerformance";
import SkillPerformance from "./Components/DashBoard/UserDasBoard/UserPerformance/SkillPerformance";
import UserPerfomance from "./Components/DashBoard/UserDasBoard/UserPerformance/UserPerfomance";
import UserProfile from "./Components/DashBoard/UserDasBoard/UserProfile";
import UserProfileInfo from "./Components/DashBoard/UserDasBoard/UserProfileInfo";
import UserSkillAssesments from "./Components/DashBoard/UserDasBoard/UserSkillAssesments";

// dashboard route ends here....

// jobs route starts here....
import JobBrowsing from "./Components/Jobs/JobBrowsing/JobBrowsing";

import JobsViews from "./Components/Jobs/JobDetails/JobsViews";
// jobs route ends here....

// private route......
import PrivateRoute from "./Components/Routes/PrivateRoute/PrivateRoute";

import NoFoundPage from "./Components/NotFoundPage/NoFoundPage";

// course route starts here....
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./Components/Common/ScrollToTop";
import CourseAdd from "./Components/Courses/Addcourse/CourseAdd";
import CourseContent from "./Components/Courses/CourseContent/CourseContent";
import CourseEdit from "./Components/Courses/CourseEdit/CourseEdit";

import InstructorEducation from "./Components/DashBoard/InstructorDashBoard/InstructorEducation";
import InstructorProfileInfo from "./Components/DashBoard/InstructorDashBoard/InstructorProfileInfo";

import RecruiterDiscussion from "./Components/DashBoard/RecruiterDashBoard/RecruiterDiscussion";
import RecruiterJobPost from "./Components/DashBoard/RecruiterDashBoard/RecruiterJobPost";
import RecruiterJobs from "./Components/DashBoard/RecruiterDashBoard/RecruiterJobs";
import RecruiterProfile from "./Components/DashBoard/RecruiterDashBoard/RecruiterProfile";
import ManPower from "./Components/Footer/FooterPages/ManPowerPage/ManPower";

import ResetPassword from "./Components/Authentication/ResetPassword";
import CourseDiscussion from "./Components/Courses/CourseDiscussion/CourseDiscussion";
import AdminProfileInfo from "./Components/DashBoard/AdminDashboard/AdminprofileInfo";
import AllUsers from "./Components/DashBoard/AdminDashboard/AllUsers";
import DashBoardBlogs from "./Components/DashBoard/AdminDashboard/DashBoardBlogs";
import ExternalQueries from "./Components/DashBoard/AdminDashboard/ExternalQueries";
import GetScholarshipData from "./Components/DashBoard/AdminDashboard/GetScholarshipData";
import HelpAndSupport from "./Components/DashBoard/AdminDashboard/HelpAndSupport";
import HelpAndSupportReply from "./Components/DashBoard/AdminDashboard/HelpAndSupportReply";
import InstructorManagement from "./Components/DashBoard/AdminDashboard/InstructorManagement";
import RecruiterManagement from "./Components/DashBoard/AdminDashboard/RecruiterManagement";
import ReplyUser from "./Components/DashBoard/AdminDashboard/ReplyUser";
import UserAnalytics from "./Components/DashBoard/AdminDashboard/UserAnalytics";
import UserManagement from "./Components/DashBoard/AdminDashboard/UserManagement";
import DashboardHelp from "./Components/DashBoard/DashboardHelp";
import DashboardSettings from "./Components/DashBoard/DashboardSettings";
import CourseDiscussionReply from "./Components/DashBoard/InstructorDashBoard/CourseDiscssionReply";
import CourseQueries from "./Components/DashBoard/InstructorDashBoard/CourseQueries";
import RecruiterEditJobs from "./Components/DashBoard/RecruiterDashBoard/RecruiterEditJobs";
import RecruiterJobCard from "./Components/DashBoard/RecruiterDashBoard/RecruiterJobCard";

import AdminReplyHelpAndSupport from "./Components/DashBoard/UserDasBoard/AdminReplyHelpAndSupport";
import InstructorReplyCourseDiscussion from "./Components/DashBoard/UserDasBoard/InstructorReplyCourseDiscussion";

import UniveAI from "./Components/DashBoard/UserDasBoard/UniveAI";
import UserDisscussion from "./Components/DashBoard/UserDasBoard/UserDisscussion";
import BlogDetails from "./Components/Footer/FooterPages/Blogs/BlogDetails";
import Workshops from "./Components/Home/Workshops/Workshop";
import AdminDashBoard from "./Components/DashBoard/AdminDashboard/AdminDashboard";
import DraftPage from "./Components/DraftPage/DraftPage";

import VerifiedCertificate from "./Components/Courses/Certificate/VerifiedCertificate";
// import Certificate from "./Components/Courses/Certificate/Certificate";
import ViewCertificate from "./Components/DashBoard/UserDasBoard/ViewCertificate";

import SkillAsessment from "./Components/Courses/SkillAssessment/SkillAsessment";
import SkillAssessmentForm from "./Components/Courses/SkillAssessment/SkillAssessmentForm";
import UserSkillShow from "./Components/DashBoard/UserDasBoard/UserSkillShow";
import ShowAllAssessment from "./Components/Courses/SkillAssessment/ShowAllAssessment";
import EditSkillAssessment from "./Components/Courses/SkillAssessment/EditSkillAssessment";
import ShowPreview from "./Components/Courses/SkillAssessment/ShowPreview";
import ShowSkillAssessmentData from "./Components/DashBoard/AdminDashboard/ShowSkillAssessmentData";

const CourseOverview = React.lazy(() =>
  import("./Components/Courses/Course Details/CourseOverview")
);
const Learn = React.lazy(() =>
  import("./Components/Courses/GetAllCourse/LearnCourse")
);
//course route ends here....

// header routes starts here....
const Univewhy = React.lazy(() =>
  import("./Components/Header/HeaderPages/Whyunive/Univewhy")
);
const HowItworks = React.lazy(() =>
  import("./Components/Header/HeaderPages/HowItWorks/HowItworks")
);

// contact route starts here...
const Contact = React.lazy(() =>
  import("./Components/Footer/FooterPages/Contact/Contact")
);

// footer page routes starts here....
const Recruiting = React.lazy(() =>
  import("./Components/Footer/FooterPages/Recruiting/Recruiting")
);
const Assessments = React.lazy(() =>
  import("./Components/Footer/FooterPages/Assessments/Assessments")
);
const Blogs = React.lazy(() =>
  import("./Components/Footer/FooterPages/Blogs/Blogs")
);
const Contributor = React.lazy(() =>
  import("./Components/Footer/FooterPages/Contributor/Contributor")
);
const Enterprise = React.lazy(() =>
  import("./Components/Footer/FooterPages/Enterprise/Enterprise")
);
const Privacy = React.lazy(() =>
  import("./Components/Footer/FooterPages/Privacy/Privacy")
);
const Instructor = React.lazy(() =>
  import("./Components/Footer/FooterPages/Instructor/Instructor")
);
const EnterPriseTerm = React.lazy(() =>
  import("./Components/Footer/FooterPages/EnterPriseTerm/EnterPriseTerm")
);
const Terms = React.lazy(() =>
  import("./Components/Footer/FooterPages/Terms/Terms")
);
const EnterprisePricing = React.lazy(() =>
  import("./Components/Footer/FooterPages/EnterprisePricing/EnterprisePricing")
);

const Careers = React.lazy(() =>
  import("./Components/Footer/FooterPages/Careers/Careers")
);
const CourseCatalog = React.lazy(() =>
  import("./Components/Footer/FooterPages/CourseCatalog/CourseCatalog")
);
const Scholarships = React.lazy(() =>
  import("./Components/Footer/FooterPages/Scholarships/Scholarships")
);
const Individual = React.lazy(() =>
  import("./Components/Footer/FooterPages/Individual/Individual")
);

const Unlimited = React.lazy(() =>
  import("./Components/Footer/FooterPages/For Individual/ForIndividual")
);

// footer page routes ends here........

function App() {
  return (
    // suspense for lazyloading
    <Suspense>
      <BrowserRouter>
        <ToastContainer></ToastContainer>
        {/* ScrollToTop moves to the top of page during switching pages */}
        <ScrollToTop>
          {/* route definitions and resulting page components....... */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login></Login>}></Route>
            <Route
              path="/registration"
              element={<Registration></Registration>}
            ></Route>

            <Route
              path="/resetPassword"
              element={<ResetPassword></ResetPassword>}
            ></Route>

            {/* dashboard route starts here......... */}

            <Route
              path="/Dashboard/"
              element={
                <PrivateRoute>
                  <NewDashBoard></NewDashBoard>
                </PrivateRoute>
              }
            >
              <Route index element={<Profile></Profile>}></Route>

              {/* User dashboard start from here */}

              {/* //this is nested user route */}
              <Route
                path="/Dashboard/userprofile/"
                element={<UserProfile role="User" />}
              >
                <Route index element={<UserProfileInfo role="User" />}></Route>
                <Route
                  path="/Dashboard/userprofile/usereducation/"
                  element={<UserEducation role="User" />}
                ></Route>
                <Route
                  path="/Dashboard/userprofile/userexperience/"
                  element={<UserExperience role="User" />}
                ></Route>
              </Route>

              <Route //this is another nested user route
                path="/Dashboard/userperfomance/"
                element={<UserPerfomance role={["User", "Instructor"]} />}
              >
                <Route index element={<CoursePerfomance />}></Route>
                <Route
                  path="/Dashboard/userperfomance/skill"
                  element={<SkillPerformance role="User" />}
                />
                <Route
                  path="/Dashboard/userperfomance/job"
                  element={<JobPerfomance role="User" />}
                />
                <Route
                  path="/Dashboard/userperfomance/quiz"
                  element={<QuizPerformance role="User" />}
                />
              </Route>

              <Route
                path="/Dashboard/user-skill-show"
                element={<UserSkillShow />}
              ></Route>

              <Route
                path="/Dashboard/usercertificate"
                element={<UserCertificate />}
              ></Route>

              <Route
                path="/Dashboard/viewcertificate"
                element={<ViewCertificate></ViewCertificate>}
              ></Route>
              <Route
                path="/Dashboard/usercourses"
                element={<UserCourses role="User" />}
              ></Route>
              <Route
                path="/Dashboard/userapplication"
                element={<UserApplication />}
              ></Route>

              <Route
                path="/Dashboard/userskillassements"
                element={<UserSkillAssesments role="User" />}
              ></Route>

              <Route
                path="/Dashboard/instructor-reply"
                element={<InstructorReplyCourseDiscussion role="User" />}
              ></Route>

              <Route
                path="/Dashboard/admin-reply"
                element={<AdminReplyHelpAndSupport role="User" />}
              ></Route>

              <Route
                path="/Dashboard/UserDisscussion"
                element={<UserDisscussion role="User" />}
              ></Route>

              <Route
                path="/Dashboard/UniveAI"
                element={<UniveAI role="User" />}
              ></Route>

              {/* User dashboard End here */}

              {/* instructor dashboard drawer starts here */}

              <Route
                path="/Dashboard/instructordashboard"
                element={<InstructorDashBoard role={["Admin", "Instructor"]} />}
              ></Route>

              {/* nested route for instructor profile */}
              <Route
                path="/Dashboard/instructorprofile/"
                element={<InstructorProfile role={["Admin", "Instructor"]} />}
              >
                <Route
                  index
                  element={
                    <InstructorProfileInfo role={["Admin", "Instructor"]} />
                  }
                ></Route>

                <Route
                  path="/Dashboard/instructorprofile/instructoreducation/"
                  element={
                    <InstructorEducation role={["Admin", "Instructor"]} />
                  }
                ></Route>
              </Route>

              <Route
                path="/Dashboard/course-queries"
                element={<CourseQueries role={["Admin", "Instructor"]} />}
              ></Route>

              <Route
                path="/Dashboard/course-queries/course-reply"
                element={<CourseDiscussionReply />}
              />

              <Route
                path="/Dashboard/leaderboard"
                element={<StudentLeaderBoard role={["Admin", "Instructor"]} />}
              ></Route>

              {/* instructor dashboard drawer End here */}

              {/*Recruiter dashboard start here   */}
              <Route
                path="/Dashboard/recruiterProfile/"
                element={<RecruiterProfile role={["Admin", "Recruiter"]} />}
              />

              <Route
                path="/Dashboard/recruiterJobPost/"
                element={
                  <PrivateRoute>
                    <RecruiterJobPost role={["Admin", "Recruiter"]} />
                  </PrivateRoute>
                }
              />

              <Route
                path="/Dashboard/recruiterJobs/"
                element={<RecruiterJobs role={["Admin", "Recruiter"]} />}
              />
              <Route
                path="/Dashboard/recruiterDiscussion/"
                element={<RecruiterDiscussion role={["Admin", "Recruiter"]} />}
              />
              <Route
                path="/Dashboard/EditJobs/:id/"
                element={
                  <PrivateRoute>
                    <RecruiterEditJobs role={["Admin", "Recruiter"]} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/Dashboard/view-applicants/:id"
                element={<RecruiterJobCard role={["Admin", "Recruiter"]} />}
              />

              {/*Recruiter dashboard End here   */}

              {/* Admin route start here */}

              <Route
                path="/Dashboard/admindashboard"
                element={<AdminDashBoard role="Admin" />}
              ></Route>

              <Route
                path="/Dashboard/show-skillAssesmentData"
                element={<ShowSkillAssessmentData role="Admin" />}
              ></Route>

              <Route
                path="/Dashboard/recruiterJobPost/"
                element={
                  <PrivateRoute>
                    <RecruiterJobPost role={["Admin", "Recruiter"]} />
                  </PrivateRoute>
                }
              ></Route>

              <Route
                path="/Dashboard/recruiterJobs/"
                element={<RecruiterJobs role={["Admin", "Recruiter"]} />}
              />

              <Route
                path="/Dashboard/adminprofile/"
                element={<AdminProfileInfo role="Admin" />}
              ></Route>

              <Route
                path="/Dashboard/all-user"
                element={<AllUsers role="Admin" />}
              ></Route>

              <Route
                path="/Dashboard/user-management"
                element={<UserManagement role="Admin" />}
              ></Route>

              <Route
                path="/Dashboard/recruiter-management"
                element={<RecruiterManagement role="Admin" />}
              ></Route>

              <Route
                path="/Dashboard/instructor-management"
                element={<InstructorManagement role="Admin" />}
              ></Route>

              <Route
                path="/Dashboard/external-queries"
                element={<ExternalQueries role="Admin" />}
              ></Route>

              <Route
                path="/Dashboard/external-queries/reply"
                element={<ReplyUser role="Admin" />}
              />
              <Route
                path="/Dashboard/get-scholarships"
                element={<GetScholarshipData role="Admin" />}
              ></Route>

              <Route
                path="/Dashboard/help-and-support"
                element={<HelpAndSupport role="Admin" />}
              ></Route>

              <Route
                path="/Dashboard/help-and-support/reply"
                element={<HelpAndSupportReply role="Admin" />}
              ></Route>

              <Route
                path="/Dashboard/user-analytics/"
                element={<UserAnalytics role="Admin" />}
              ></Route>

              <Route
                path="/Dashboard/dashboard-settings"
                element={<DashboardSettings role="Admin" />}
              ></Route>

              <Route
                path="/Dashboard/dashboard-help"
                element={<DashboardHelp role="Admin" />}
              ></Route>

              <Route
                path="/Dashboard/dashboard-Blogs"
                element={<DashBoardBlogs role="Admin" />}
              ></Route>
            </Route>

            {/* dashboard routes ends here........ */}

            {/* course route starts here...... */}

            <Route
              path="/addcourse"
              element={
                <PrivateRoute>
                  <CourseAdd role={["Admin", "Instructor"]} />
                </PrivateRoute>
              }
            />

            <Route path="/learn" element={<Learn />} />

            <Route
              path="/learn/:id"
              element={
                <PrivateRoute>
                  <CourseOverview />
                </PrivateRoute>
              }
            />

            <Route
              path="/coursedit/:id"
              element={
                <PrivateRoute>
                  <CourseEdit role={["Admin", "Instructor"]} />
                </PrivateRoute>
              }
            />

            <Route
              path="/course-content/:id"
              element={
                <PrivateRoute>
                  <CourseContent />
                </PrivateRoute>
              }
            />

            <Route
              path="/ask-the-instructor"
              element={
                <PrivateRoute>
                  <CourseDiscussion />
                </PrivateRoute>
              }
            />

            {/* course route ends here........ */}

            <Route
              path="/skill-assessment/:id"
              element={
                <PrivateRoute>
                  <SkillAsessment />
                </PrivateRoute>
              }
            />

            <Route
              path="/skill-assessment-form"
              element={
                <PrivateRoute>
                  <SkillAssessmentForm role={["Admin", "Recruiter"]} />
                </PrivateRoute>
              }
            />

            <Route
              path="/edit-skill-assessment-form/:id"
              element={
                <PrivateRoute>
                  <EditSkillAssessment role={["Admin", "Recruiter"]} />
                </PrivateRoute>
              }
            />

            <Route
              path="/show-skill-assessment"
              element={<ShowAllAssessment />}
            />

            <Route
              path="/show-skill-assessment-preview/:id"
              element={<ShowPreview />}
            />

            {/* header page routes start here........ */}
            <Route path="/why-unive" element={<Univewhy />} />
            <Route path="/how-it-works" element={<HowItworks />} />

            {/* header page routes ends here......*/}

            {/* contact route..... */}
            <Route path="/contact" element={<Contact />} />

            {/* jobs route starts here */}
            <Route path="/jobs" element={<JobBrowsing />} />
            <Route path="/jobsView/:id" element={<JobsViews></JobsViews>} />

            {/* jobs route ends here */}

            {/* footer pages routes starts here.......... */}

            <Route path="/unive-for-individual" element={<Individual />} />
            <Route path="/unive-for-hr-recruiting" element={<Recruiting />} />
            <Route path="/unive-for-enterprise" element={<Enterprise />} />

            <Route path="/unive-learning" element={<Unlimited />} />

            <Route path="/skill-assessments" element={<Assessments />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogDetails/:id" element={<BlogDetails />} />

            <Route path="/for-enterprise" element={<EnterprisePricing />} />

            <Route path="/manpower-as-a-service" element={<ManPower />} />
            <Route
              path="/become-an-unive-instructor"
              element={<Instructor />}
            />
            <Route path="/become-a-contributor" element={<Contributor />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms-of-service" element={<Terms />} />
            <Route
              path="/business-terms-of-service"
              element={<EnterPriseTerm />}
            />
            <Route path="/activities" element={<Workshops />} />

            <Route path="/careers" element={<Careers />} />
            <Route path="/course-catalogue/:tag" element={<CourseCatalog />} />
            <Route path="/scholarships" element={<Scholarships />} />
            {/* footer pages ends here...... */}

            {/* no page found route........ */}
            <Route path="*" element={<NoFoundPage />} />

            {/* other can see */}
            <Route
              path="/verified-certificate/:certificateId"
              element={<VerifiedCertificate />}
            />

            <Route
              path="/to-be-published"
              element={
                <PrivateRoute>
                  <DraftPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
