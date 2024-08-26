import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Divider from '@mui/material/Divider';

const CustomDrawer = ({ open, onClose, onSubmit }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [checked, setChecked] = useState([false, false]);
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleToggle = (index) => () => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const handleConfirm = () => {
    const selectedWidgets = [
      { name: 'Cloud Accounts', selected: checked[0] },
      { name: 'Cloud Account Risk Assessment', selected: checked[1] }
    ];

    selectedWidgets.forEach((widget) => {
      if (widget.selected) {
        const widgetInfo = {
          name: widgetName || widget.name,
          text: widgetText || 'Default text'
        };
        console.log("Submitting widget:", widgetInfo.name); // Debug log
        console.log("Widget Text:", widgetInfo.text); // Debug log
        onSubmit(widgetInfo); // Ensure this is being called with the correct data
      }
    });

    onClose(); // Close the drawer after submitting
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 300, padding: 20 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="CSPM" />
          <Tab label="CWPP" />
          {/* Add other tabs as needed */}
        </Tabs>
        <Divider style={{ margin: '16px 0' }} />
        <List>
          {['Cloud Accounts', 'Cloud Account Risk Assessment'].map((text, index) => (
            <ListItem key={text} dense button onClick={handleToggle(index)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked[index]}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <input
          type="text"
          placeholder="Widget Name"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
          style={{ width: '100%', marginTop: 16 }}
        />
        <textarea
          placeholder="Widget Text"
          value={widgetText}
          onChange={(e) => setWidgetText(e.target.value)}
          style={{ width: '100%', marginTop: 8, height: 80 }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirm
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;