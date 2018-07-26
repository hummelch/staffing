import React, { Component } from 'react';

class ProjectForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state = {
      name: '',
      description: '',
      estimation_days: 5,
      start_week: 1,
      end_week: 52,
      closed: false,
      staffings: []
    };
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleReset(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form>
        <div className="grid-container">

          <div className="grid-x grid-padding-x">
            <div className="cell">
              <label>Customer
                <input type="text" placeholder="Customer name" />
              </label>
            </div>

            <div className="medium-6 cell">
              <label>Project name
                <input type="text" placeholder="Project name" />
              </label>
            </div>

            <div className="medium-3 cell">
              <label>Project number
                <input type="text" placeholder="Teambox project number" />
              </label>
            </div>

            <div className="medium-3 cell">
              <label>Project Status
              <select>
                  <option value="ordered">Ordered</option>
                  <option value="planed">Offered</option>
                  <option value="projected">Projected (FYI)</option>
                  <option value="onhold">On Hold</option>
                </select>
              </label>
            </div>

            <div className="medium-6 cell">
              <label>Project Manager
                <input type="text" placeholder="Project Manager name" />
              </label>
            </div>

            <div className="medium-6 cell">
              <label>Favored Developer
                <input type="text" placeholder="Favored Developer name" />
              </label>
            </div>

            <div className="cell">
              <label>Description
                <textarea defaultValue={this.state.description} placeholder="Additional informations about the project" style={{ height: '10rem' }}></textarea>
              </label>
            </div>

            <div className="medium-4 cell">
              <label>Estimated working days
                <input type="number" step="0.25" placeholder="Days" />
              </label>
            </div>

            <div className="medium-4 cell">
              <label>Starting Week (KW)
              <select>
                  <option value="husker">Husker</option>
                  <option value="starbuck">Starbuck</option>
                  <option value="hotdog">Hot Dog</option>
                  <option value="apollo">Apollo</option>
                </select>
              </label>
            </div>

            <div className="medium-4 cell">
              <label>Endging Week (KW)
              <select>
                  <option value="husker">Husker</option>
                  <option value="starbuck">Starbuck</option>
                  <option value="hotdog">Hot Dog</option>
                  <option value="apollo">Apollo</option>
                </select>
              </label>
            </div>
          </div>

          <div className="button-group">
            <input onClick={this.handleSubmit} type="submit" className="button" value="Submit" />
            <input onClick={this.handleReset} type="submit" className="secondary button" value="Reset" />
          </div>
        </div>
      </form>
    );
  }
}

export default ProjectForm;
