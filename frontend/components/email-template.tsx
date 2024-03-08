import * as React from "react"

interface EmailTemplateProps {}

export const EmailTemplate = () => (
  <>
    <div className="bg-gray-100 p-8">
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-blue-500">
            New Machine Learning Outputs!
          </div>
          <p className="text-gray-700 text-base">Hello,</p>
          <p className="text-gray-700 text-base">
            We are excited to announce that new machine learning outputs are now
            available on our website.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <a
            href="interactiverl.ucd.ie"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Explore Now
          </a>
        </div>
      </div>
    </div>
  </>
)
