import './CountdownTimer.css';

export default function CountdownTimer({votingTime}) {

    if (votingTime <= 0) {
        return (
        <div className="expired-notice">
            <span>Voting Expired!!!</span>
        </div>
        );
    }
    return (
        <div className="show-counter">
            <div className="countdown">
                <p>{votingTime}</p>
                <span>Seconds</span>
            </div>
        </div>
    )
}