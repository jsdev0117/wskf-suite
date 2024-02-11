import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import { IconCirclePlus } from '@tabler/icons-react'
import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import Chip from 'ui-component/extended/Chip'

const Dojos = () => {
  return (
    <MainCard title='Dojos' secondary={
      <Tooltip arrow title='Add Dojo'>
        <IconButton sx={{ ':hover': { color: 'green' } }}>
          <IconCirclePlus />
        </IconButton>
      </Tooltip>
    }
    >
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Members</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Yoshitaka</TableCell>
              <TableCell>
                <Chip chipcolor={'success'} label='Activo' />
              </TableCell>
              <TableCell>65</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  )
}

export default Dojos