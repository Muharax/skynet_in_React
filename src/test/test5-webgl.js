import React, { useState, useEffect } from 'react';
import Tooltip from './test4-tooltip-component';


const TreeNode = ({ node, shouldOpen }) => {
  const [isOpen, setIsOpen] = useState(shouldOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setIsOpen(shouldOpen);
  }, [shouldOpen]);

  return (
    <ul style={{ listStyleType: 'none', userSelect: 'none' }}>
      <li>
        <button  className="noo" onClick={handleToggle} disabled={!node.children || node.children.length === 0}>
          {node.children && node.children.length > 0 ? (isOpen ? '-' : '+') : ''}
        </button>
        {node.position} - {node.name}
        {isOpen && node.children && (
          <ul>
            {node.children.map(childNode => (
              <TreeNode key={childNode.id} node={childNode} shouldOpen={shouldOpen}/>
            ))}
          </ul>
        )}
      </li>
    </ul>
  );
};

const Tree = ({ data, shouldOpen }) => (
  <div style={{ maxHeight: '500px', overflowX: 'auto' }}>
    {data.map(node => (
      <TreeNode key={node.id} node={node} shouldOpen={shouldOpen} />
    ))}
  </div>
);

const Webgl = () => {
  const [allOpen, setAllOpen] = useState(false);

  const handleToggleAll = () => {
    setAllOpen(!allOpen);
  }

  const treeData = [
    {
      id: 1,
      position: 'CEO',
      name: 'John Doe',
      children: [
        {
          id: 2,
          position: 'CTO',
          name: 'Jane Smith',
          children: [
            {
              id: 3,
              position: 'Engineer',
              name: 'Bob Johnson',
            },
            {
              id: 4,
              position: 'Designer',
              name: 'Alice Williams',
            },
            {
              id: 4,
              position: 'Designer',
              name: 'Alice Williams',
            },
            {
              id: 4,
              position: 'Designer',
              name: 'Alice Williams',
            },
            {
              id: 4,
              position: 'Designer',
              name: 'Alice Williams',
            },{
              id: 4,
              position: 'Designer',
              name: 'Alice Williams',
            },
          ],
        },
        {
          id: 5,
          position: 'CFO',
          name: 'Charlie Brown',
          children: [
            {
              id: 6,
              position: 'Accountant',
              name: 'Grace Davis',
            },
          ],
        },
        {
          id: 5,
          position: 'CFS',
          name: 'Halabazda Harabelduha',
          children: [
            {
              id: 6,
              position: 'Engineer',
              name: 'Grace Davis',
              children: [
                {
                  id: 7,
                  position: 'Halabazda',
                  name: 'Idi na H',
                  children: [
                    {
                      id: 8,
                      position: 'Halabazda',
                      name: 'Idi na HUJ',
                      children: [
                        {
                          id: 9,
                          position: 'Halabazda',
                          name: 'Idi na HUJ',
                          children: [
                            {
                              id: 10,
                              position: 'Halabazda',
                              name: 'Idi na HUJ',
                              children: [
                                {
                                  id: 11,
                                  position: 'Halabazda',
                                  name: 'Idi na HUJ',
                                  children: [
                                    {
                                      id: 12,
                                      position: 'Halabazda',
                                      name: 'Idi na HUJ',
                                      children: [
                                        {
                                          id: 13,
                                          position: 'Halabazda',
                                          name: 'Idi na HUJ',
                                          children: [
                                            {
                                              id: 14,
                                              position: 'Halabazda',
                                              name: 'Idi na HUJ',
                                              children: [
                                                {
                                                  id: 15,
                                                  position: 'Halabazda',
                                                  name: 'Idi na HUJ',
                                                  children: [
                                                    {
                                                      id: 16,
                                                      position: 'Halabazda',
                                                      name: 'Idi na HUJ',
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 5,
      position: 'GHP',
      name: 'Dyrektor finansowy',
      children: [
        {
          id: 2,
          position: 'Halabazda',
          name: 'Idi na HUJ',
          children: [
            {
              id: 2,
              position: 'Halabazda',
              name: 'Idi na HUJ',
            },
          ],
        },
      ],
    },
  ];

  return (
  
  <>
    <Tooltip text="Hello World! Siema ENIU">
      <h4 className='h4'>SIEMA TOOLTIP, SIEMA ENIU, SIEMA BARABELUZDO, SIEMA MANDEBARDEHULDA</h4>
      </Tooltip>

    <div className='noo'>
      <button onClick={handleToggleAll}>
        {allOpen ? 'Close' : 'Open'}
      </button>
      <Tree data={treeData} shouldOpen={allOpen} />
    </div>
    </>
  );
};

export default Webgl;
