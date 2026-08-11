import providerService from "../services/provider.service.js";
import {
  getProfile as getSyriProfile,
  getProducts as getSyriProducts,
  getContent as getSyriContent
} from "../services/providers/syriastore.service.js";

import {
  getProfile as getWolfProfile,
  getProducts as getWolfProducts,
  getContent as getWolfContent
} from "../services/providers/wolfstore.service.js";

export const getProviders = async (req, res) => {
  try {
    const providers = await providerService.getAll();
    res.json({
      success: true,
      providers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const addProvider = async (req, res) => {
  try {
    const provider = await providerService.create(req.body);
    res.json({
      success: true,
      provider
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateProvider = async (req, res) => {
  try {
    const provider = await providerService.update(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      provider
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteProvider = async (req, res) => {
  try {
    await providerService.delete(req.params.id);

    res.json({
      success: true,
      message: "Provider deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const testProvider = async (req, res) => {
  try {
    const provider = await providerService.getById(req.params.id);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found"
      });
    }

    let data = null;

    if (provider.code === "SYRIASTORE") {
      data = await getSyriProfile();
    }

    if (provider.code === "WOLFSTORE") {
      data = await getWolfProfile();
    }

    res.json({
      success: true,
      online: true,
      provider,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      online: false,
      message: error.message
    });
  }
};
