import CourseDetailsPage from "@/component/DetailsCourse";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";

const PageSuspense = async ({ params }) => {
  const { id } = await params;
//   console.log( "from id page",id)

    // Better Auth থেকে JWT Token
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  return <CourseDetailsPage id={id} token={token} />
};

const DynamicPage = ({ params }) => {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <PageSuspense params={params} />
      </Suspense>
    </div>
  );
};

export default DynamicPage;