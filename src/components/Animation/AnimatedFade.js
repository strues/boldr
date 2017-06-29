// @flow
import React from 'react'
import { TransitionMotion, spring } from 'react-motion'

const willEnter = () => ({
    opacity: 0,
    scale: 0.98,
})

const willLeave = () => ({
    opacity: spring(0),
    scale: spring(1.02),
})

const getStyles = () => ({
    opacity: spring(1),
    scale: spring(1),
})

const styles = {
    wrapper: {
        position: 'absolute',
        width: '100%',
    },
}

const AnimatedFade = ({ children: child, getKey }: { children?: any, getKey: () => any }) => (
    <TransitionMotion
        styles={[
            {
                key: getKey(),
                style: getStyles(),
                data: { child },
            },
        ]}
        willEnter={willEnter}
        willLeave={willLeave}
    >
        {interpolated => (
            <div style={{ position: 'relative' }}>
                {interpolated.map(({ key, style, data }) => (
                    <div
                        key={`${key}-transition`}
                        style={{
                            ...styles.wrapper,
                            opacity: style.opacity,
                            transform: `scale(${style.scale})`,
                        }}
                    >
                        {data.child}
                    </div>
                ))}
            </div>
        )}
    </TransitionMotion>
)

export default AnimatedFade
