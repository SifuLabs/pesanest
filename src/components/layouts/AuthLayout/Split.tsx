import { cloneElement } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { CommonProps } from '@/@types/common'

interface SplitProps extends CommonProps {
    content?: ReactNode
}

const Split = ({ children, content, ...rest }: SplitProps) => {
    return (
        <div className="grid lg:grid-cols-2 h-full p-6 bg-white dark:bg-gray-800">
            {/* Left Section with Image & Branding */}
            <div className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-center items-center hidden lg:flex bg-primary rounded-3xl">
                <div className="flex flex-col items-center gap-12">
                    <img
                        className="max-w-[450px] 2xl:max-w-[900px]"
                        src="/img/others/auth-split-img.png"
                        alt="pesa-nest-intro"
                    />
                    <div className="text-center max-w-[550px]">
                        <h1 className="text-neutral font-bold text-2xl">
                            Grow Together with PesaNest
                        </h1>
                        <p className="text-neutral opacity-80 mx-auto mt-8 font-semibold">
                            A modern platform for SACCOs and Chamas in Kenya. 
                            Track contributions, manage loans, and simplify group 
                            finances — all in one place.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section for Forms */}
            <div className="flex flex-col justify-center items-center">
                <div className="w-full xl:max-w-[450px] px-8 max-w-[380px]">
                    <div className="mb-8">{content}</div>
                    {children
                        ? cloneElement(children as ReactElement, {
                              ...rest,
                          })
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Split
