import React from 'react';
import Json from 'react-json-tree';
import { Link } from 'react-router-dom';
const { ipcRenderer, clipboard } = window.require('electron');

class ApiTester extends React.Component {
  state = {
    reply: {},
    url: ''
  };

  urls = [
    'league_match_ranking/17073112T/ALL',
    'onlineshop/merchandises',
    // POST 'onlineshop/order/4780952683920142604',
    'results',
    'results/180',
    'nickname_and_icon',
    'schedules',
    'records/hero',
    'timeline',
    'festivals/active',
    'data/stages',
    'records'
  ];

  handleButtonClick = async () => {
    const league = ipcRenderer.sendSync('getApi', this.state.url);
    this.setState({ reply: league });
  };

  handleUrlChange = e => {
    this.setState({ url: e.target.value });
  };

  handleSelectChange = e => {
    this.setState({ url: e.target.value });
  };

  render() {
    return (
      <div style={{ marginTop: 65 }}>
        <Link to="/">
          <button onClick={this.handleButtonClick}>Back</button>
        </Link>
        <button onClick={this.handleButtonClick}>Get API</button>
        <button
          onClick={() => clipboard.writeText(JSON.stringify(this.state.reply))}
        >
          Copy to Clipboard
        </button>
        <input
          type="text"
          value={this.state.url}
          onChange={this.handleUrlChange}
        />
        <select onClick={this.handleSelectChange}>
          {this.urls.map(url =>
            <option key={url} value={url}>
              {url}
            </option>
          )}
        </select>
        <Json data={this.state.reply} invertTheme={false} />
      </div>
    );
  }
}

export default ApiTester;
