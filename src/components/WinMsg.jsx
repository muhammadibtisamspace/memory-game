const WinMsg = ({ moves }) => {
  return (
    <div className="win-message">
        <h2>Congratulations! You've won the game!</h2>
        <p>In {moves} moves</p>
    </div>
  )
}

export default WinMsg