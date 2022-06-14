const foundEls: string[] = []; // keeps a log of elements that are found and initialized, so as not to try reinitializing them
export interface ObserverDef {
  selector: String;
  callback: (elem: any) => void;
}

/**
 * handler to process user-defined callback when element is located in DOM
 * @param {NodeList} elements - All elements found matching the user-defined selector in "observerDefs"
 * @return {void}
 */
const handleFound = (
  elements: NodeListOf<HTMLElement>,
  observerDef: any
): void => {
  elements.forEach((element) => {
    if (!foundEls.includes(element.id)) {
      foundEls.push(element.id);
      observerDef.callback(element);
    }
  });
};

/**
 * Creates a single-use observer to await the existance of a DOM element
 * @param {Array<ObserverDef>} observerDefs - an array of elements to await
 * @return {Array<observer} observers - an array of all MutationObservers created
 */
export const createObserver = (observerDefs: any) => {
  // As assistance for delayed initialization, define an observer to watch for changes
  var observers: MutationObserver[] = [];
  observerDefs.forEach(function (obd: any) {
    observers.push(
      new MutationObserver(function (mutations, me) {
        var targetElems = document.querySelectorAll(obd.selector);
        if (targetElems.length > 0) {
          handleFound(targetElems, obd);
          me.disconnect(); // stop observing
          return;
        }
      })
    );
  });

  // start observing
  observers.forEach(function (observer) {
    observer.observe(document, {
      childList: true,
      subtree: true
    });
  });

  return observers;
};

export const Uuid = () => {
  const windowObj: any = window;
  const winCrypto = windowObj.crypto || windowObj.msCrypto;
  let index = winCrypto.getRandomValues(new Uint32Array(1))[0];
  index = +`${index}`.substr(0, 1);
  const uuid = winCrypto.getRandomValues(new Uint32Array(10))[index];
  return uuid;
};

export const setElementId = (elId: string, elName = `el`): string => {
  if (elId) {
    return elId;
  }
  elId = `${elName}-${Uuid()}`;
  return elId;
};

export const stringToBoolean = (thisState: boolean | string) => {
  if (typeof thisState === `boolean`) {
    return thisState;
  }
  if (thisState === `1` || thisState === `true`) {
    return true;
  }
  return false;
};

export const pascalDash = function (key: string) {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};

export const hasChanges = (changes: any) => {
  if (
    changes &&
    !changes.firstChange &&
    changes.previousValue !== changes.currentValue
  ) {
    return true;
  }
  return false;
};

export const ddsIcon = (icon: string): string => {
  if (icon) {
    if (!icon.match(/dds__icon--/)) {
      icon = `dds__icon--${icon}`;
    }
  }
  return icon;
};

export const ddsLink = (link: string): string => {
  if (!link) {
    link = `javascript:void(0);`;
  }
  return link;
};

export const debounce = (func: any, timeout = 500) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const throttle = (func: any, timeout = 500) => {
  let timer: any;
  return (...args: any) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
};

export const arrayRemove = (arr: Array<any>, removal: any) => {
  try {
    if (typeof removal === `string`) {
      // search by string value to remove
      return arr.filter(function (ele) {
        return ele !== removal;
      });
    } else {
      // remove by object property
      for (var i = arr.length - 1; i >= 0; --i) {
        if (arr[i].value === removal.value) {
          arr.splice(i, 1);
        }
      }
      return arr;
    }
  } catch (e) {
    console.error(e, arr);
    return undefined;
  }
};

export const arrayAdd = (arr: Array<any>, value: any) => {
  try {
    if (typeof value === `string`) {
      // search by string value to find if exists
      if (arr.includes && !arr.includes(value)) {
        arr.push(value);
      }
    } else {
      // search by object property to find if exists
      if (!arr.find((i) => i.value === value.value)) {
        arr.push(value);
      }
    }
    return arr;
  } catch (e) {
    console.error(e, arr);
    return undefined;
  }
};

export const parseData = (data: any) => {
  try {
    // replace single quotes with double quotes for true JSON
    data = JSON.parse(
      data.replace(/\\'/g, "@p0z").replace(/'/g, '"').replace(/@p0z/g, "'")
    );
  } catch (e) {
    console.error(e);
    data = [];
  }
  return data;
};

/**
 * @method getClosest   Crawls the DOM to find the closest targeted element
 * @param element       {DOM element}   the DOM element from which to start searching
 * @param selector      {string}        the class, ID, or tag name for which to search
 * @param parentsOnly   {boolean}       if false or not set, modifies TAG search to include children elements of the currently-inspected target
 * @return {element} or false
 */
export function getClosest(
  element: any,
  selector: string,
  parentsOnly: boolean
) {
  // element is the element and selector is for the closest parent element to find
  // updated to also make sure that once we reach document fragment (shadowroot) condition exits
  // source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
  var firstChar = selector.charAt(0);

  var selectorSubstring = selector.substr(1);
  if (firstChar === ".") {
    // If selector is a class
    for (
      ;
      element && element !== document;
      element = element.host ? element.host : element.parentNode
    ) {
      // Get closest match
      if (
        element.parentNode &&
        element.parentNode.querySelector(selector) !== null &&
        // hasClass(element, selectorSubstring)) {
        element.classList["contains"](selectorSubstring)
      ) {
        return element;
      } else if (parentsOnly === false) {
        if (element.querySelector(selector)) {
          return element.querySelector(selector);
        }
      }
    }
  } else if (firstChar === "#") {
    // If selector is an ID
    for (
      ;
      element && element !== document;
      element = element.host ? element.host : element.parentNode
    ) {
      // Get closest match
      if (element.id === selectorSubstring) {
        return element;
      } else if (parentsOnly === false) {
        if (element.querySelector(selector)) {
          return element.querySelector(selector);
        }
      }
    }
  } else {
    // If selector is a tagName
    for (
      ;
      element && element !== document;
      element = element.host ? element.host : element.parentNode
    ) {
      // Get closest match
      if (
        element.tagName &&
        element.tagName.toLowerCase() === selector.toLowerCase()
      ) {
        return element;
      } else if (
        element.previousElementSibling &&
        element.previousElementSibling.tagName.toLowerCase() ===
          selector.toLowerCase()
      ) {
        return element.previousElementSibling;
      } else if (parentsOnly === false) {
        if (element.querySelector(selector)) {
          return element.querySelector(selector);
        }
      }
    }
  }
  return false;
}

export const tryParseOptions = (options: any) => {
  try {
    if (typeof options === `string`) {
      options = JSON.parse(options);
    }
    return options;
  } catch (e) {
    console.error(e);
  }
};
