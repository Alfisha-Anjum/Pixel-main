 <div className="w-full py-20 relative overflow-hidden">
          <Image
            src="/img/learning.png" // Your image file here
            alt="Learning - Lightbulb Collaboration"
            fill
            sizes="100vw"
            className=""
            priority
          />
</div>
         <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 flex flex-col lg:flex-row gap-8">
                  {/* MAIN CONTENT */}
                  <div className="flex-1 lg:w-[65%] max-w-4xl">
                    <p className="text-orange-500 text-sm font-semibold uppercase tracking-wide">
                      Learn
                    </p>
        
                    <h1 className="text-4xl md:text-5xl lg:text-[32px] font-bold mt-2 text-gray-900 leading-tight">
                      Remote Collaboration: Best Practices, Challenges, And Tools
                    </h1>
        
                    <div className="flex items-center gap-6 bg-white p-4">
                      <div className="flex items-center gap-2 text-lg font-medium text-gray-700">
                        <span>
                          <img src="/pen.png" alt="" />
                        </span>
                        <span>Admin</span>
                      </div>
                      <div className="flex items-center gap-2 text-lg font-medium text-gray-700">
                        <span>
                          <img src="/Calendar.png" alt="" />
                        </span>
                        <span>27, Oct, 2024</span>
                      </div>
                    </div>
        
                    <div className="bg-white rounded-lg p-6 mb-6">
                      {/* Card-like body */}
                      <p className="text-gray-700 text-base leading-relaxed mb-6">
                        There are many variations of passages of Lorem Ipsum available,
                        but the majority have suffered alteration in some form, by
                        injected humour, or randomised words which don't look even
                        slightly believable.
                      </p>
                      <div className="mb-6">
                        <Image
                          src="/img/girlworking.png"
                          alt="Woman working remotely on laptop"
                          width={800}
                          height={450}
                          className="w-full h-auto object-cover rounded-md"
                          priority
                        />
                      </div>
        
                      <p className="text-gray-700 text-base leading-relaxed mb-6">
                        There are many variations of passages of Lorem Ipsum available,
                        but the majority have suffered alteration in some form
                        variations of passages of Lorem Ipsum available. [file:1]
                      </p>
                      <p className="text-gray-700 text-base leading-relaxed mb-6">
                        There are many variations of passages of Lorem Ipsum available,
                        but the majority have suffered alteration in some form
                        variations of passages of Lorem Ipsum available There are many
                        variations of passages of Lorem Ipsum available. [file:1]
                      </p>
                      <p className="text-gray-700 text-base leading-relaxed">
                        There are many variations of passages of Lorem Ipsum available,
                        but the majority have suffered alteration in some form
                        variations of passages of Lorem Ipsum available. [file:1]
                      </p>
                    </div>
                    {/* Reactions - fixed flex without images */}
                    <div className="flex items-center gap-6 bg-white p-4">
                      <div className="flex items-center gap-2 text-lg font-medium text-gray-700">
                        <span>
                          <img src="/like.png" alt="" />
                        </span>
                        <span>335 Likes</span>
                      </div>
                      <div className="flex items-center gap-2 text-lg font-medium text-gray-700">
                        <span>
                          <img src="/unlike.png" alt="" />
                        </span>
                        {/* Use emoji or icon */}
                        <span>30 Dislikes</span>
                      </div>
                      <div className="flex items-center gap-2 text-lg font-medium text-gray-700">
                        <span>
                          <img src="/comment.png" alt="" />
                        </span>
                        <span>10 Comments</span>
                      </div>
                    </div>
                  </div>
        