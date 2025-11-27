import '@/components/BounceLoader.css'

export const BounceLoader = ({ className }: { className?: string }) => {
    return (
        <span
            className={className}
            style={{
                display: 'inherit',
                position: 'relative',
                width: '60px',
                height: '60px',
            }}
        >
            <span
                style={{
                    position: 'absolute',
                    height: '60px',
                    width: '60px',
                    backgroundColor: 'rgb(0, 0, 0)',
                    borderRadius: '100%',
                    opacity: 0.6,
                    top: 0,
                    left: 0,
                    animation: 'bounce-loader 2.1s ease-in-out 1s infinite',
                }}
            ></span>

            <span
                style={{
                    position: 'absolute',
                    height: '60px',
                    width: '60px',
                    backgroundColor: 'rgb(0, 0, 0)',
                    borderRadius: '100%',
                    opacity: 0.6,
                    top: 0,
                    left: 0,
                    animation: 'bounce-loader 2.1s ease-in-out 0s infinite',
                }}
            ></span>
        </span>
    )
}
