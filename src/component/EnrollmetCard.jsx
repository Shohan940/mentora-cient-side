import React from "react";
import EnrollmentButton from "./EnrollmentButton";

const EnrollmetCard = ({price,instructor,course}) => {
  return (
    <>
      <div>
        <p className="text-xs font-bold tracking-widest text-slate-500">
          COURSE PRICE
        </p>

        <h2 className="mt-2 text-3xl font-extrabold text-blue-600">${price}</h2>

        <p className="mt-7 text-sm text-slate-700">
          <strong>Instructor:</strong> {instructor}
        </p>

        <hr className="my-5 border-slate-200" />

        <ul className="space-y-4 text-sm font-medium text-slate-600">
          <li className="flex items-center gap-2">
            <span className="text-blue-600">●</span>
            Lifetime Access
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-600">●</span>
            Expert Guidance
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-600">●</span>
            Verified Certificate
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <EnrollmentButton course= {course}/>

        <p className="mt-5 text-center text-xs font-medium text-slate-400">
          30-Day Money-Back Guarantee
        </p>
      </div>
    </>
  );
};

export default EnrollmetCard;
