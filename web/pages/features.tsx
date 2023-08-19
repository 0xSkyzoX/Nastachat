/* This example requires Tailwind CSS v2.0+ */

import Footer from "../components/footer"
import Navbar from "../components/navbar"

const features = [
    {
        name: 'Invite team members',
        description: 'Collaborate effectively by inviting team members to your workspace.',
    },
    {
        name: 'Notifications',
        description: 'Stay informed with real-time notifications about important updates.',
    },
    {
        name: 'List view',
        description: 'Organize your tasks and projects with a convenient list view.',
    },
    {
        name: 'Boards',
        description: 'Visualize your projects using boards for enhanced project management.',
    },
    {
        name: 'Keyboard shortcuts',
        description: 'Boost your productivity with keyboard shortcuts for common tasks.',
    },
    {
        name: 'Reporting',
        description: 'Generate reports to analyze project progress and team performance.',
    },
    {
        name: 'Calendars',
        description: 'Plan your schedule and tasks using integrated calendar features.',
    },
    {
        name: 'Mobile app',
        description: 'Stay connected and productive on the go with our mobile app.',
    },
]

const metrics = [
    { id: 1, stat: '8K+', emphasis: 'Companies', rest: 'use our platform for efficient collaboration.' },
    { id: 2, stat: '25K+', emphasis: 'Countries worldwide', rest: 'are benefiting from our solutions.' },
    { id: 3, stat: '98%', emphasis: 'Customer satisfaction', rest: 'rate our services as excellent.' },
    { id: 4, stat: '12M+', emphasis: 'Issues resolved', rest: 'have been successfully addressed by our team.' },
]

export default function Features() {
    return (
        <div>
            <Navbar />
            <main className="mt-28 pt-32  mx-auto max-w-7xl px-4 sm:mt-24 pb-44">
  <div className="text-center">
    <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
      <span className="block xl:inline">Discover the Power of Our</span>{' '}
      <span className="block text-indigo-600 xl:inline">Feature-Rich Platform</span>
    </h1>
    <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
      Unlock new possibilities and elevate your business with our cutting-edge features. From streamlined collaboration to advanced reporting, we've got you covered.
    </p>
    <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
      <div className="rounded-md shadow">
        <a
          href="#"
          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
        >
          Get started
        </a>
      </div>
      <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
        <a
          href="#"
          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-gray-800 hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
        >
          Explore features
        </a>
      </div>
    </div>
  </div>
</main>

    
            <div className="relative bg-gray-900 flex justify-center">
                <div className="h-80 absolute inset-x-0 bottom-0 xl:top-0 xl:h-full">
                    <div className="h-full w-full xl:grid xl:grid-cols-2">
                        <div className="h-full xl:relative xl:col-start-2">
                            <img
                                className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
                                src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                                alt="People working on laptops"
                            />
                            <div
                                aria-hidden="true"
                                className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
                            />
                        </div>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8">
                    <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
                        <h2 className="text-sm font-semibold tracking-wide uppercase">
                            <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                                Valuable Metrics
                            </span>
                        </h2>
                        <p className="mt-3 text-3xl font-extrabold text-white">
                            Get Insights that Drive Business Growth
                        </p>
                        <p className="mt-5 text-lg text-gray-300">
                            Gain a deep understanding of your business performance with our comprehensive metrics.
                            We provide you with actionable data and insights that empower you to make informed decisions.
                            Whether it's analyzing customer engagement or tracking key performance indicators, our metrics
                            solution helps you drive growth and achieve your business goals.
                        </p>

                        <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
                            {metrics.map((item) => (
                                <p key={item.id}>
                                    <span className="block text-2xl font-bold text-white">{item.stat}</span>
                                    <span className="mt-1 block text-base text-gray-300">
                                        <span className="font-medium text-white">{item.emphasis}</span> {item.rest}
                                    </span>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#1d1e27]"> {/* Apply 'dark' class for dark mode */}
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">All-in-one platform</h2> {/* Adjust text color */}
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-300"> {/* Adjust text color */}
                            Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla nec.
                        </p>
                    </div>
                    <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative">
                                <dt>
                                    <p className="ml-9 text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{feature.name}</p> {/* Adjust text color */}
                                </dt>
                                <dd className="mt-2 ml-9 text-base text-gray-500 dark:text-gray-300">{feature.description}</dd> {/* Adjust text color */}
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
            <Footer />
        </div>

    )
}
