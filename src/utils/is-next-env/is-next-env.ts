let isNextEnv: boolean;

export const isNextEnvironment = () => {
	// If already checked, return cached result
	if (typeof isNextEnv !== 'undefined') {
		return isNextEnv;
	}

	try {
		// Attempt to load Next.js-specific module
		require('next/router');
		isNextEnv = true;
	} catch (e) {
		isNextEnv = false;
	}

	return isNextEnv;
};

// export default isNextEnvironment;
