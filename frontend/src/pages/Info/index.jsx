import React from "react";

const Info = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
          WEBSITE AUTHORS
        </h1>
        <p>Created to predict house prices using AI</p>
        <p>Assignment 3</p>
      </div>
      <div className="flex flex-col items-center gap-10 my-10">
        <div className="card w-auto card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://swinburne.instructure.com/images/thumbnails/33592771/3kwCSVLfJzFsjKiybU0exEDUcnuBE8fXMiPVDQYQ"
              alt="Alex"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Alex Vrsecky</h2>
            <p>
              Student ID: 104268899 <br /> Email: 104268899@student.swin.edu.au
            </p>
            <div className="card-actions justify-end">
              <a
                href="mailto:104268899@student.swin.edu.au"
                className="btn btn-primary"
              >
                Email me
              </a>
            </div>
          </div>
        </div>
        <div className="card w-auto card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://swinburne.instructure.com/images/messages/avatar-50.png"
              alt="Thomas"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Thomas Peacock</h2>
            <p>
              Student ID: 102173577 <br /> Email: 102173577@student.swin.edu.au
            </p>
            <div className="card-actions justify-end">
              <a
                href="mailto:104268899@student.swin.edu.au"
                className="btn btn-primary"
              >
                Email me
              </a>
            </div>
          </div>
        </div>
        <div className="card w-auto card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://swinburne.instructure.com/images/messages/avatar-50.png"
              alt="Nitesh"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Nitesh Gurung </h2>
            <p>Student ID: 104484695 <br /> Email: 104484695@student.swin.edu.au</p>
            <div className="card-actions justify-end">
              <a
                href="mailto:104268899@student.swin.edu.au"
                className="btn btn-primary"
              >
                Email me
              </a>
            </div>
          </div>
        </div>
        <div>
            UI Component Library used: <br/>
            DaisyUI https://daisyui.com/ <br/>
            HyperUI https://www.hyperui.dev/
        </div>
      </div>
    </div>
  );
};

export default Info;
