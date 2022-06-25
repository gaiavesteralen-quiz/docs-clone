export const container = {

    hidden: { 
        x: 75, 
        opacity: 0, 
    },

    show: {
        x: 0,
        opacity: 1,
        transition: {
            staggerChildren: 0.5
      },
    }
}

export const containerHome = {

    hidden: { 
        x: -75, 
        opacity: 0, 
    },

    show: {
        x: 0,
        opacity: 1,
        transition: {
            staggerChildren: 0.5
      },
    }
}

export const modalIn = {
    hidden: {
        scale: 0.5,
        opacity: 0,
    },

    show: {
        scale: 1,
        opacity: 1,
        transition: {
            staggerChildren: 0.5
        }
    },
}

export const modalOut = {
    hidden: {
        y: 100,
        opacity: 0,
    },

    show: {
        y: 0,
        opacity: 1,
        transition: {
            staggerChildren: 0.5
        }
    },
}

export const containerModal = {
    hidden: { 
        y: 30, 
        opacity: 0, 
    },

    show: {
        y: 0,
        opacity: 1,
        transition: {
            staggerChildren: 0.5
      },
    }
}

export const docsIn = {
    hidden: { 
        x: -15, 
        opacity: 0, 
    },

    show: {
        x: 0,
        opacity: 1,
        transition: {
            staggerChildren: 0
      },
    },
}

export const docsOut = {
    hidden: { 
        x: 15, 
        opacity: 0, 
    },

    show: {
        x: 0,
        opacity: 1,
        transition: {
            staggerChildren: 0
      },
    },
}
