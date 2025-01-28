import React from "react";

const CommentsList = ({ comments }) => {
  return (
    <div>
      {comments && comments?.length > 0 ? (
        comments?.map((comment, index) => (
          <div
            key={comment.productUid + index}
            className="flex flex-row gap-2 mt-5 items-start last:border-none border-b border-divided p-3 text-base"
          >
            <div className="flex flex-col p-0.5 gap-1">
              <div className="flex flex-col gap-1">
                <p className="text-dark">{comment.fullName}</p>
                <p className="text-darkDivided">{comment.date}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-darkDivided">{comment.comment}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 flex justify-center">
          <p className="text-darkDivided">No comments available</p>
        </div>
      )}
    </div>
  );
};

export default CommentsList;
