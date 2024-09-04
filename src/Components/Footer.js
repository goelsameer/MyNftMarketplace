import React from 'react'

function Footer() {
  return (
    <div>
         <div className="bg-blue-500 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center space-y-8 sm:space-y-0 sm:flex-row sm:space-x-8">
        {/* Stay in the Loop Section */}
        <div className="w-full sm:w-1/3 text-center sm:text-left">
          <h3 className="text-lg font-bold">Stay in the loop</h3>
          <p className="text-sm my-4">
            Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating OpenSea.
          </p>
          <form className="flex mt-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 w-full rounded-l-lg text-black"
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-r-lg"
            >
              Sign up
            </button>
          </form>
        </div>

        {/* Join the Community Section */}
        <div className="w-full sm:w-1/3 text-center">
          <h3 className="text-lg font-bold">Join the community</h3>
          <div className="flex justify-center mt-4 space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-blue-700 p-3 rounded-lg hover:bg-blue-600">
              {/* Twitter Icon */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter_3D.png" alt="Twitter" className="h-6 w-6"/>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-blue-700 p-3 rounded-lg hover:bg-blue-600">
              {/* Instagram Icon */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Instagram-Icon.png" alt="Instagram" className="h-6 w-6"/>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="bg-blue-700 p-3 rounded-lg hover:bg-blue-600">
              {/* Discord Icon */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Discord_Logo.png" alt="Discord" className="h-6 w-6"/>
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="bg-blue-700 p-3 rounded-lg hover:bg-blue-600">
              {/* YouTube Icon */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube" className="h-6 w-6"/>
            </a>
          </div>
        </div>

        {/* Need Help Section */}
        <div className="w-full sm:w-1/3 text-center sm:text-right">
          <h3 className="text-lg font-bold">Need help?</h3>
          <button className="bg-blue-700 hover:bg-blue-600 px-4 py-2 mt-4 rounded-lg">
            Contact Support
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Footer