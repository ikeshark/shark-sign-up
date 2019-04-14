import React from 'react';

class Success extends React.Component {
  state = { time: 5, isBlack: false }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.time) {
        this.setState({ time: this.state.time - 1 });
      } else {
        this.stop();
        this.setState({ isBlack: true });
      }
    }, 1000);
  }

  stop = () => {
    clearInterval(this.interval)
  }

  render() {

    return (
      <div className={this.state.isBlack ? "blackOut" : "successWrapper" }>
        <h2>SUCCESS</h2>
        <p>Please await further instructions</p>
        <h2>This page will self distruct in...</h2>
        <p className="time">{this.state.time}</p>
      </div>
    );
  }
}

export default Success;
