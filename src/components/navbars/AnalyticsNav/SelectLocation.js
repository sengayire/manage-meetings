import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import PropTypes from 'prop-types';
import { getAllLocationsFromCache, getUserLocation } from '../../helpers/QueriesHelpers';

const SelectLocation = ({ active, handleLocationChange }) => {
  const location = getUserLocation().name;
  return (
    <ApolloConsumer>
      {
        client => (
          <div className={`btn-right__location__dropdown${active ? ' btn-right__location__dropdown--active' : ''}`}>
            <div
              className="btn-right__location__dropdown__background"
            >
              {
                getAllLocationsFromCache().map(({ name }) => (
                  name === location ? null : <button key={name} />
                ))
              }
            </div>
            <div
              className="btn-right__location__dropdown__background btn-right__location__dropdown__background--foreground"
            >
              {
                getAllLocationsFromCache().map(loc => (
                  loc.name === location
                    ? null
                    : (
                      <button
                        key={loc.name}
                        onClick={() => {
                            client.writeData({ data: { userLocation: loc } });
                            handleLocationChange(loc.id);
                          }
                        }
                      />
                    )
                ))
              }
            </div>
            <div className="btn-right__location__dropdown__text">
              {
                getAllLocationsFromCache().map(({ name }) => (
                  name === location ? null : (
                    <div
                      key={name}
                      className="btn-right__location__dropdown__text__item"
                    >
                      {name}
                    </div>
                  )
                ))
              }
            </div>
          </div>
        )
      }
    </ApolloConsumer>
  );
};

SelectLocation.propTypes = {
  active: PropTypes.bool.isRequired,
  handleLocationChange: PropTypes.func.isRequired,
};

export default SelectLocation;
