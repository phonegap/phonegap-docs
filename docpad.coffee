# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {
    # Src Path
    # Where can we find our source website files?
    # If it is a relative path, it will have the resolved `rootPath` prepended to it
    srcPath: '.'

    # Documents Paths
    # An array of paths which contents will be treated as documents
    # If it is a relative path, it will have the resolved `srcPath` prepended to it
    documentsPaths: [
        'docs'
    ]

    # Files Paths
    # An array of paths which contents will be treated as files
    # If it is a relative path, it will have the resolved `srcPath` prepended to it
    filesPaths: [  # default
        'static'
        'files'
        'public'
    ]

    # Layouts Paths
    # An array of paths which contents will be treated as layouts
    # If it is a relative path, it will have the resolved `srcPath` prepended to it
    layoutsPaths: [  # default
        'layouts'
    ]
}

# Export the DocPad Configuration
module.exports = docpadConfig
