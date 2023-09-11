const express = require('express');
const router = express.Router();
const Country = require('../models/country.model');
const State = require('../models/state.model');
// Get all countries


exports.countryAdd =async (req, res) => {
    try {
      const country = new Country(req.body);
      await country.save();
      res.status(201).json(country);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Add a new state
  exports.stateAdd = async (req, res) => {
    try {
      const state = new State(req.body);
      await state.save();
      res.status(201).json(state);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
exports.getAllCountry = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.countryWiseState = async (req, res) => {
    try {
      const { countryId } = req.params;
      const states = await State.find({ countryId })
      res.json(states);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


