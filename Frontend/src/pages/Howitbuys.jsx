import React from 'react'
import contactHero from '../assets/ContactImgs/contactImg.png'
import { Buy1, Buy2, Buy3, Buy4, Buy5 } from '../assets'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Howitbuys = () => {
    const steps = [
        {
            id: 1,
            step: 'STEP 1 : SEARCHING & ORDER PLACEMENT',
            title: 'Select The Vehicle You Wish To Buy',
            description: 'Your Search For Your Car Will Assist You In Browsing Our Stock. You Can Personalize Your Search Based On Your Specific Needs And Preferences. Get Your Purchase Conditions Such As Your Destination Country and Port Of Destination. Fill In Your Personal Information So That A Proforma Invoice/Proforma Invoice Will Then Be Sent To Your Mail & Your Reservation Would Be Applied Over The Plot For Better Experience.',
            image: Buy1,
            buttonText: 'See More How To Order'
        },
        {
            id: 2,
            step: 'STEP 2 : PAYMENT',
            title: 'Proceed To Payment',
            description: 'We Accept Bank wire transfers (Telegraphic Transfer) & any agreements of Money Transfer As Per Japan Policy. All Payments Should Be Sent To HTG Japan As Beneficiary Account In Japan. Proceed To Your Local Bank To Make Payment Via Wire Transfer (Telegraphic Transfer) For Your Invoice. Send Us a Copy of the bank receipt either via email (info@hqautosjapan.com) or whatsapp (+81 80-1052-1435).',
            image: Buy2,
            buttonText: 'See More How To Payment'
        },
        {
            id: 3,
            step: 'STEP 3 : SHIPMENT',
            title: 'Booking Notification',
            description: 'As Soon As Payment Is Confirmed, We Book Space For Your Car On A Shipping Vessel. At This Time You Have To Confirm The Consignee Information Finally Via Email. Once The Operation Would Complete, A Booking Notification Will Be Sent To Notify You Content. Once You Receive The Above Mentioned Documents, Contact Your Custom clearance agent to organize the import of your vehicle.',
            image: Buy3,
            buttonText: 'See More How To Shipment'
        },
        {
            id: 4,
            step: 'STEP 4 : CUSTOMS CLEARANCE',
            title: 'Consult With Your Local Clearing Agent',
            description: 'In Order To Import The Car, You Need To Clear It First. Consult, Contact Your Customs Clearance Agent For Guidance. Because You Need To Clear Your Car First Before Importing. All Relevant documentation During The Course Of The Time Soon Copies Of Document Will Be Sent Via Email / WhatsApp. Also the required clearance papers/documents will be sent to you via courier.',
            image: Buy4,
            buttonText: 'See More About Clearing Agent'
        },
        {
            id: 5,
            step: 'STEP 5 : REGISTER AND DRIVE',
            title: 'Receiving Of Vehicle',
            description: 'Pick up the vehicle as it is all yours...!',
            image: Buy5,
            buttonText: 'See More How To Register'
        }
    ]

    return (
        <div className='bg-white'>
            <div
                className="relative h-[450px] bg-cover bg-center flex items-center px-6 sm:px-10 "
                style={{ backgroundImage: `url(${contactHero})` }}
            >
                <div className="custom-padding  w-full flex flex-col gap-2">
                    <p className="text-white  font-medium mb-2 lg:text-xl">Home / How to Buy</p>
                    <h2 className="text-3xl md:text-4xl custom-size-two:text-6xl  text-white uppercase tracking-wider mb-">
                        How to Buy
                    </h2>
                    <b className='font-[poppins] text-xl md:text-xl text-white mb-2 uppercase'>Buying a Car online</b>
                    <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed max-w-3xl font-[poppins]">
                        Importing A Car Is Simpler Than You Might Imagine. In Fact, It Is A Straightforward And Easy-To-Follow Process.
                    </p>
                </div>
            </div>

            <div className=" custom-padding py-16 px-4 sm:px-6 lg:px-8">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                        className={`flex flex-col lg:flex-row items-center gap-10 mb-20 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''} `}
                    >
                        {/* Image Section */}
                        <div className="w-full lg:w-1/2">
                            <motion.img
                                src={step.image}
                                alt={step.title}
                                className="w-full max-w-xl h-fit mx-auto rounded-3xl shadow-xl object-cover"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        {/* Content Section */}
                        <div className="w-full lg:w-1/2 space-y-4">
                            <span className="  md:text-xl font-bold text-gray-800 tracking-wider uppercase font-[poppins]">
                                {step.step}
                            </span>
                            <h3 className="text-3xl md:text-4xl custom-size-two:text-5xl font-semibold    text-gray-900 ">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed font-medium font-[poppins]">
                                {step.description}
                            </p>
                            <Link to="/contact-us">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-[#ED1C24] text-white px-8 py-3 rounded-xl font-bold uppercase font-[poppins]  tracking-wide shadow-lg hover:bg-red-700 transition-colors mt-4"
                                >
                                    {step.buttonText}
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Howitbuys
