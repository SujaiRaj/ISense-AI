import apiClient from './api';
import { MOCK_STANDARDS } from '../data/mockStandards';

export const getStandardsList = async (filters = {}) => {
  try {
    let endpoint = '/standards';
    if (filters.search) {
      endpoint = `/standards/search?q=${encodeURIComponent(filters.search)}`;
    } else if (filters.category && filters.category !== 'All') {
      endpoint = `/standards/category/${encodeURIComponent(filters.category)}`;
    }

    const response = await apiClient.get(endpoint);
    let list = response.data || [];

    if (filters.status && filters.status !== 'All') {
      list = list.filter(s => (s.status || '').toLowerCase() === filters.status.toLowerCase());
    }

    // Standardize dataset fields for React UI components
    const mapped = list.map(s => ({
      ...s,
      isNumber: s.is_number || s.isNumber,
      productCategory: s.product || s.productCategory || "Indian Standard",
      publicationYear: s.latest_version ? parseInt(s.latest_version) || 2024 : 2024,
      explanation: s.scope,
      keyRequirements: s.keywords || [],
      certification: typeof s.certification === 'object' ? s.certification : {
        isMandatory: true,
        qcoApplicable: true,
        qcoName: typeof s.certification === 'string' ? s.certification : "BIS Compulsory Certification",
        statusText: typeof s.certification === 'string' ? s.certification : "BIS Standard Mandatory"
      }
    }));

    return {
      success: true,
      total: mapped.length,
      data: mapped
    };
  } catch (err) {
    console.warn('[ISense AI] Live Standards API call failed. Using local dataset.', err.message);

    let result = [...MOCK_STANDARDS];

    if (filters.category && filters.category !== 'All') {
      result = result.filter(s => s.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.status && filters.status !== 'All') {
      result = result.filter(s => s.status.toLowerCase() === filters.status.toLowerCase());
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(s => 
        (s.isNumber || '').toLowerCase().includes(q) ||
        (s.title || '').toLowerCase().includes(q) ||
        (s.productCategory || '').toLowerCase().includes(q)
      );
    }

    return {
      success: true,
      total: result.length,
      data: result
    };
  }
};

export const getStandardById = async (id) => {
  try {
    const response = await apiClient.get(`/standards/${id}`);
    const s = response.data;
    if (s) {
      const mapped = {
        ...s,
        isNumber: s.is_number || s.isNumber,
        productCategory: s.product || s.productCategory || "Indian Standard",
        publicationYear: s.latest_version ? parseInt(s.latest_version) || 2024 : 2024,
        explanation: s.scope,
        keyRequirements: s.keywords || [],
        certification: typeof s.certification === 'object' ? s.certification : {
          isMandatory: true,
          qcoApplicable: true,
          qcoName: typeof s.certification === 'string' ? s.certification : "BIS Compulsory Certification",
          statusText: typeof s.certification === 'string' ? s.certification : "BIS Standard Mandatory"
        }
      };
      return {
        success: true,
        data: mapped
      };
    }
  } catch (err) {
    console.warn('[ISense AI] Live Standard detail API call failed. Using local fallback.', err.message);
  }

  const standard = MOCK_STANDARDS.find(s => s.id === id || (s.isNumber || '').toLowerCase().includes(id.toLowerCase()));

  return {
    success: true,
    data: standard || MOCK_STANDARDS[0]
  };
};
